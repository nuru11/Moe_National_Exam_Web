import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

/**
 * Recursively converts snake_case keys to camelCase
 */
function snakeToCamel(str: string): string {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Recursively transforms object keys from snake_case to camelCase
 */
function transformKeysToCamelCase(obj: unknown): unknown {
    if (obj === null || obj === undefined) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => transformKeysToCamelCase(item));
    }

    if (typeof obj === 'object' && obj !== null && obj.constructor === Object) {
        const transformed: Record<string, unknown> = {};
        const objRecord = obj as Record<string, unknown>;
        for (const key in objRecord) {
            if (Object.prototype.hasOwnProperty.call(objRecord, key)) {
                const camelKey = snakeToCamel(key);
                transformed[camelKey] = transformKeysToCamelCase(objRecord[key]);
            }
        }
        return transformed;
    }

    return obj;
}

/**
 * Get auth token from localStorage
 */
function getAuthToken(): { access: string; refresh: string } | null {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const authStorage = localStorage.getItem('auth-storage');
        if (!authStorage) {
            return null;
        }

        const parsed = JSON.parse(authStorage);
        return parsed?.state?.token || null;
    } catch (error) {
        console.error('Error reading auth token from localStorage:', error);
        return null;
    }
}

/**
 * Update auth token in localStorage
 */
function updateAuthToken(token: { access_token: string; refresh_token: string }): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        const authStorage = localStorage.getItem('auth-storage');
        if (!authStorage) {
            return;
        }

        const parsed = JSON.parse(authStorage);
        parsed.state.token = token;
        parsed.state.isAuthenticated = true;
        localStorage.setItem('auth-storage', JSON.stringify(parsed));
    } catch (error) {
        console.error('Error updating auth token in localStorage:', error);
    }
}

/**
 * Clear auth data from localStorage (logout)
 */
function clearAuthData(): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        localStorage.removeItem('auth-storage');
    } catch (error) {
        console.error('Error clearing auth data from localStorage:', error);
    }
}

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Flag to track if a refresh is in progress
let isRefreshing = false;
// Queue of failed requests that need to be retried after token refresh
let failedQueue: Array<{
    resolve: (value?: string) => void;
    reject: (error?: AxiosError) => void;
}> = [];

/**
 * Process the queue of failed requests after token refresh
 */
function processQueue(error: AxiosError | null, token: string | null = null) {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token ?? undefined);
        }
    });

    failedQueue = [];
}

/**
 * Refresh the access token using the refresh token
 */
async function refreshToken(): Promise<string> {
    const token = getAuthToken();
    if (!token?.refresh) {
        throw new Error('No refresh token available');
    }

    try {
        // Create a new axios instance without interceptors to avoid infinite loops
        const refreshAxiosInstance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
        });

        const response = await refreshAxiosInstance.post(
            '/auth/refresh/',
            {
                refresh: token.refresh,
            }
        );

        const responseData = response.data as { access: string };
        const newAccessToken = responseData.access;


        updateAuthToken({
            access_token: newAccessToken,
            refresh_token: token.refresh,
        });

        return newAccessToken;
    } catch (error) {
        clearAuthData();
        if (typeof window !== 'undefined') {
            window.location.href = '/signIn';
        }
        throw error;
    }
}

// Add request interceptor to attach access token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token?.access) {
            config.headers.Authorization = `Bearer ${token.access}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to transform snake_case to camelCase and handle 401 errors
axiosInstance.interceptors.response.use(
    (response) => {
        if (response.data) {
            response.data = transformKeysToCamelCase(response.data);
        }
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Also transform error responses if needed
        if (error.response?.data) {
            error.response.data = transformKeysToCamelCase(error.response.data);
        }

        // Handle 401 Unauthorized errors
        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
            if (isRefreshing) {
                // If a refresh is already in progress, queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token: unknown) => {
                        if (originalRequest.headers && typeof token === 'string') {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                        }
                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const newAccessToken = await refreshToken();
                processQueue(null, newAccessToken);

                // Retry the original request with new token
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                }
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError as AxiosError, null);
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
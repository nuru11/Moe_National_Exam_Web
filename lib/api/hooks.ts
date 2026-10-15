import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/config/axiosInstance';
import type {
    ExamResponse,
    LeaderboardEntry,
    AuthResponse,
    User,
    CompetetionResponse,
    UserRequest,
    NewsResponse,
    QuestionResponse,
    GradeResponse,
    WebsiteGrade,
    UserStatsResponse,
    UserAnswerRequest,
    AuthToken,
    EntranceTricksStatus,
    Testimonial,
    UserScoreResponse,
} from '@/lib/types';
import { useAuthStore } from '@/store/authStore';
import { APP_PACKAGE, WEB_GRADE_APPS } from '@/lib/config/app';

// Auth Hooks
export const useLogin = () => {
    const { login } = useAuthStore();

    return useMutation({
        mutationFn: async (credentials: { email: string; password: string; app_package: string }) => {
            const response = await axiosInstance.post<AuthResponse>('/auth/login/', credentials);
            return response.data;
        },
        onSuccess: (data) => {
            login(data);
        },
    });
};

export const useRegister = () => {
    const { login } = useAuthStore();

    return useMutation({
        mutationFn: async (userData: { email: string; password: string; first_name: string; gradeId: number; app_package: string }) => {
            const response = await axiosInstance.post<User & { tokens: AuthToken }>('/auth/register/', userData);
            return response.data;
        },
        onSuccess: (data) => {
            login({ user: data, tokens: data.tokens });
        },
    });
};

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: async (email: string) => {
            const response = await axiosInstance.post<{ detail: string }>('/auth/password/forgot/', { email });
            return response.data;
        },
    });
};

export const useResetPassword = () => {
    return useMutation({
        mutationFn: async (payload: { email: string; code: string; password: string }) => {
            const response = await axiosInstance.post<{ detail: string }>('/auth/password/reset/', payload);
            return response.data;
        },
    });
};

// Exams Hooks
export const useExams = (gradeId: number) => {
    return useQuery({
        queryKey: ['exams', gradeId],
        queryFn: async () => {
            const params = new URLSearchParams({
                mode_type: 'exam_mode',
                grade: String(gradeId),
                device: 'mobile',
                app_package: APP_PACKAGE,
            });
            const response = await axiosInstance.get<ExamResponse[]>(`/app/exams/?${params.toString()}`);
            return response.data;
        },
        enabled: !!gradeId,
    });
};

export const useExam = (examId: number, gradeId?: number) => {
    return useQuery({
        queryKey: ['exam', examId, gradeId ?? null],
        queryFn: async () => {
            const params = new URLSearchParams({
                device: 'mobile',
                app_package: APP_PACKAGE,
            });
            if (gradeId) {
                params.set('grade', String(gradeId));
            }
            const response = await axiosInstance.get<ExamResponse>(`/app/exams/${examId}/?${params.toString()}`);
            return response.data;
        },
        enabled: !!examId,
    });
};

// Competitions Hooks
export const useCompetitions = () => {
    return useQuery({
        queryKey: ['competitions'],
        queryFn: async () => {
            const response = await axiosInstance.get<CompetetionResponse[]>('/app/competitions/');
            return response.data;
        },
    });
};

// Leaderboard Hooks
export const useLeaderboard = (type: 'global' | 'exam' | 'competition' = 'global', id?: number) => {
    return useQuery({
        queryKey: ['leaderboard', type, id],
        queryFn: async () => {
            let url = '/app/competitions/leaderboard/';
            if (type === 'exam' && id) {
                url = `/app/exams/${id}/leaderboard/entries/`;
            } else if (type === 'competition' && id) {
                url = `/app/competitions/${id}/leaderboard/entries/`;
            }
            const response = await axiosInstance.get<LeaderboardEntry[]>(url);
            return response.data;
        },
    });
};

// Submit Answer Hooks
export const useSubmitAnswer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (answer: UserAnswerRequest) => {
            const response = await axiosInstance.post(`/app/user-answers/`, answer);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['exam'] });
        },
    });
};

// Submit Exam
export const useSubmitExam = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (examId: number) => {
            const response = await axiosInstance.post(`/app/exams/${examId}/submit/`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['exams'] });
            queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
        },
    });
};

// User Profile
export const useProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const response = await axiosInstance.get<User>('/auth/me/');
            return response.data;
        },
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    const { updateUser } = useAuthStore();

    return useMutation({
        mutationFn: async (userData: Partial<UserRequest> | FormData) => {
            // When using FormData, axios automatically sets Content-Type with boundary
            // For regular JSON, axios sets application/json
            const response = await axiosInstance.patch<User>('/auth/me/update/', userData);
            return response.data;
        },
        onSuccess: (data) => {
            updateUser(data);
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
    });
};

export const useDeleteAccount = () => {
    const { logout } = useAuthStore();

    return useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.delete('/auth/me/delete-account/');
            return response.data;
        },
        onSuccess: () => {
            logout();
        },
    });
};

// News Hooks
export const useNews = () => {
    return useQuery({
        queryKey: ['news'],
        queryFn: async () => {
            const response = await axiosInstance.get<NewsResponse[]>('/app/news/');
            return response.data;
        },
    });
};

export const useNewsItem = (newsId: number) => {
    return useQuery({
        queryKey: ['news', newsId],
        queryFn: async () => {
            const response = await axiosInstance.get<NewsResponse>(`/app/news/${newsId}/`);
            return response.data;
        },
        enabled: !!newsId,
    });
};



export const useQuestions = (examId: number, enabled = true) => {
    return useQuery({
        queryKey: ['questions', examId],
        queryFn: async () => {
            const response = await axiosInstance.get<QuestionResponse[]>(`/app/questions/?exam=${examId}&device=mobile`);
            return response.data;
        },
        enabled: !!examId && enabled,
    });
};


export const useGrades = () => {
    return useQuery({
        queryKey: ['grades', 'web-apps'],
        queryFn: async () => {
            const groups = await Promise.all(
                WEB_GRADE_APPS.map(async (app) => {
                    const response = await axiosInstance.get<GradeResponse[]>(
                        `/app/grades/?app_package=${encodeURIComponent(app.package)}`
                    );
                    return response.data.map(
                        (grade): WebsiteGrade => ({
                            ...grade,
                            appLabel: app.label,
                            appPackage: app.package,
                        })
                    );
                })
            );
            return groups.flat();
        },
    });
};

export const useUserStats = () => {
    return useQuery({
        queryKey: ['competitions', 'users', 'stats'],
        queryFn: async () => {
            const response = await axiosInstance.get<UserStatsResponse>(`/app/competitions/users/stats/`);
            return response.data;
        },
    });
};


export const useBulkSubmitAnswers = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (answers: UserAnswerRequest[]) => {
            const response = await axiosInstance.post(`/app/user-answers/bulk-submit/`,
                answers,
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['questions'] });
            queryClient.invalidateQueries({ queryKey: ['user-stats'] });
        },
    });
};


export const useEntranceTricksStatus = () => {
    return useQuery({
        queryKey: ['entrance-tricks-status'],
        queryFn: async () => {
            const response = await axiosInstance.get<EntranceTricksStatus>(`/app/entrance-tricks-stats/`);
            return response.data;
        },
    });
};


export type AppStoreLink = {
    appPackage: string;
    playStoreUrl: string;
    appStoreUrl: string;
};

export const useStoreLinks = () => {
    return useQuery({
        queryKey: ['store-links'],
        queryFn: async () => {
            const response = await axiosInstance.get<AppStoreLink[]>('/app/store-links/');
            return response.data;
        },
    });
};

export const useTestimonials = () => {
    return useQuery({
        queryKey: ['testimonials'],
        queryFn: async () => {
            const response = await axiosInstance.get<Testimonial[]>(`/app/testimonials/`);
            return response.data;
        },
    });
};

export const useUserScore = (competetionId: string) => {
    return useQuery({
        queryKey: ['user-score', competetionId],
        queryFn: async () => {
            const response = await axiosInstance.get<UserScoreResponse>(`/app/competitions/${competetionId}/user/stats/`);
            return response.data;
        },
        enabled: !!competetionId,
    });
};
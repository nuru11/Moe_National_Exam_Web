'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  CircularProgress,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Grade as GradeIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useLogin, useRegister, useGrades } from '@/lib/api/hooks';
import Header from '@/components/Header';
import { APP_PACKAGE } from '@/lib/config/app';
import gradeMenuItems from '@/components/GradeMenuItems';
import { AxiosError } from 'axios';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function examReturnPath(path: string | null): string {
  if (!path || path.includes('://') || path.startsWith('//') || path.includes('..')) {
    return '/exams';
  }
  if (path === '/exams' || path.startsWith('/exams/') || path.startsWith('/exams?')) {
    return path;
  }
  return '/exams';
}

function apiErrorMessage(data: unknown, fallback: string): string {
  if (!data || typeof data !== 'object') {
    return fallback;
  }
  const parts: string[] = [];
  for (const value of Object.values(data as Record<string, unknown>)) {
    if (typeof value === 'string' && value.trim()) {
      parts.push(value);
    } else if (Array.isArray(value)) {
      const texts = value.filter((item): item is string => typeof item === 'string' && item.trim() !== '');
      if (texts.length) {
        parts.push(texts.join(', '));
      }
    }
  }
  return parts.join(' ') || fallback;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const destination = examReturnPath(searchParams.get('return'));
  const { isAuthenticated } = useAuthStore();
  const [tabValue, setTabValue] = useState(searchParams.get('tab') === 'signup' ? 1 : 0);
  const [showPassword, setShowPassword] = useState(false);

  // Login form
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Register form
  const [registerData, setRegisterData] = useState({
    first_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    grade_id: Number(searchParams.get('grade')) || 1,
  });

  const [error, setError] = useState('');

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  useEffect(() => {
    if (isAuthenticated) {
      router.push(destination);
    }
  }, [isAuthenticated, router, destination]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!loginData.email || !loginData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!isValidEmail(loginData.email)) {
      setError('Enter a valid email address');
      return;
    }

    try {
      const normalizedData = {
        email: loginData.email.trim().toLowerCase(),
        password: loginData.password,
        app_package: APP_PACKAGE,
      };
      await loginMutation.mutateAsync(normalizedData);
      router.push(destination);
    } catch (err: unknown) {
      const error = err as AxiosError;
      setError(apiErrorMessage(error.response?.data, 'Invalid credentials. Please try again.'));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (
      !registerData.first_name ||
      !registerData.email ||
      !registerData.password ||
      !registerData.confirmPassword
    ) {
      setError('Please fill in all fields');
      return;
    }

    if (!isValidEmail(registerData.email)) {
      setError('Enter a valid email address');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (registerData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      const { confirmPassword, ...dataToSend } = registerData;
      const normalizedData = {
        first_name: dataToSend.first_name,
        email: dataToSend.email.trim().toLowerCase(),
        password: dataToSend.password,
        gradeId: dataToSend.grade_id,
        app_package: APP_PACKAGE,
      };
      await registerMutation.mutateAsync(normalizedData);
      router.push(destination);
    } catch (err: unknown) {
      const error = err as AxiosError;
      setError(apiErrorMessage(error.response?.data, 'Registration failed. Please try again.'));
    }
  };

  const { data: grades } = useGrades();

  useEffect(() => {
    const gradeId = Number(searchParams.get('grade'));
    if (!grades?.some((grade) => grade.id === gradeId)) {
      return;
    }
    setRegisterData((current) => (
      current.grade_id === gradeId ? current : { ...current, grade_id: gradeId }
    ));
  }, [grades, searchParams]);

  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          pt: 10,
          pb: 4,
        }}
      >
        <Container maxWidth="sm">
          <Card
            sx={{
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              borderRadius: 4,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: 280,
                    height: 120,
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <Image
                    src="/logos/education_assessment_examinations_service_logo.jpg"
                    alt="Educational Assessment and Examinations Service"
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  Welcome to MOE National Exam
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sign in to continue your learning journey
                </Typography>
              </Box>

              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  aria-label="auth tabs"
                >
                  <Tab label="Sign In" />
                  <Tab label="Sign Up" />
                </Tabs>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              {/* Sign In Tab */}
              <TabPanel value={tabValue} index={0}>
                <form onSubmit={handleLogin}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Enter your email"
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Enter your password"
                  />
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loginMutation.isPending}
                    sx={{ mt: 3, mb: 2, py: 1.5 }}
                  >
                    {loginMutation.isPending ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>
              </TabPanel>

              {/* Sign Up Tab */}
              <TabPanel value={tabValue} index={1}>
                <form onSubmit={handleRegister}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={registerData.first_name}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, first_name: e.target.value })
                    }
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Enter your first name"
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, email: e.target.value })
                    }
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Enter your email"
                  />
                  <TextField
                    fullWidth
                    select
                    label="Grade"
                    value={registerData.grade_id}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, grade_id: Number(e.target.value) })
                    }
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <GradeIcon />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {gradeMenuItems(grades)}
                  </TextField>
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={registerData.password}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, password: e.target.value })
                    }
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Create a password"
                  />
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type={showPassword ? 'text' : 'password'}
                    value={registerData.confirmPassword}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, confirmPassword: e.target.value })
                    }
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Confirm your password"
                  />
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={registerMutation.isPending}
                    sx={{ mt: 3, mb: 2, py: 1.5 }}
                  >
                    {registerMutation.isPending ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Sign Up'
                    )}
                  </Button>
                </form>
              </TabPanel>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  By continuing, you agree to our{' '}
                  <Link href="/terms" style={{ color: 'inherit', fontWeight: 600 }}>
                    Terms of Service
                  </Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              component={Link}
              href="/"
              sx={{ color: 'white', textDecoration: 'underline' }}
            >
              Back to Home
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}


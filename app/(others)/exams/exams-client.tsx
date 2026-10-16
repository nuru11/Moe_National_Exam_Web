'use client';

import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Button,
    Card,
    CardContent,
    Chip,
    TextField,
    InputAdornment,
    MenuItem,
    Alert,
    Stack,
    Skeleton,
    CircularProgress,
} from '@mui/material';
import {
    Search,
    Timer,
    Quiz,
    Lock,
    LockOpen,
    TrendingUp,
    Assessment,
    CheckCircle,
    ArrowForward,
} from '@mui/icons-material';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useExams, useGrades } from '@/lib/api/hooks';
import { useAuthStore } from '@/store/authStore';
import { WEB_GRADE_APPS } from '@/lib/config/app';
import { useSelectedApp } from '@/components/SelectedAppProvider';
import AppProgramCard from '@/components/AppProgramCard';

export default function ExamsPage() {
    const router = useRouter();
    const { user } = useAuthStore();
    const searchParams = useSearchParams();
    const gradeFromQuery = Number(searchParams.get('grade')) || 0;
    const [authReady, setAuthReady] = useState(false);

    useEffect(() => {
        const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
            setAuthReady(true);
        });
        if (useAuthStore.persist.hasHydrated()) {
            queueMicrotask(() => {
                setAuthReady(true);
            });
        }
        return unsubscribe;
    }, []);

    const gradeId = gradeFromQuery || (authReady ? user?.grade?.id || 0 : 0);
    const { data: exams, isLoading, error } = useExams(gradeId);

    const { selectedPackage, setSelectedPackage, setSelectedGrade } = useSelectedApp();
    const { data: grades, isLoading: gradesLoading } = useGrades();

    useEffect(() => {
        if (!gradeFromQuery || !grades) {
            return;
        }
        const grade = grades.find((item) => item.id === gradeFromQuery);
        if (grade) {
            setSelectedGrade(grade.id, grade.appPackage);
        }
    }, [gradeFromQuery, grades, setSelectedGrade]);
    const gradesForApp = grades?.filter((grade) => grade.appPackage === selectedPackage) ?? [];
    const selectedApp = WEB_GRADE_APPS.find((app) => app.package === selectedPackage);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState<string>('all');
    const [filterSubject, setFilterSubject] = useState<string>('all');

    // Get unique exam types and subjects
    const examTypes = exams ? ['all', ...Array.from(new Set(exams.map(e => e.examType)))] : ['all'];
    const subjects = exams
        ? ['all', ...Array.from(new Set(exams.filter(e => e.subject).map(e => e.subject!.name)))]
        : ['all'];

    // Filter exams
    const filteredExams = exams?.filter((exam) => {
        const matchesSearch = exam.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || exam.examType === filterType;
        const matchesSubject = filterSubject === 'all' || exam.subject?.name === filterSubject;
        return matchesSearch && matchesType && matchesSubject;
    }) || [];

    const handleOpenExam = (examId: number) => {
        const gradeQuery = gradeId ? `?grade=${gradeId}` : '';
        router.push(`/exams/${examId}${gradeQuery}`);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: 'background.default',
                py: 4,
            }}
        >
            <Container maxWidth="xl">
                {!gradeFromQuery && !authReady && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                        <Skeleton variant="rounded" width="100%" height={180} />
                    </Box>
                )}
                {authReady && !gradeId && (
                    <Box sx={{ py: 2 }}>
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                            Practice Exams
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            Select a program, then a grade, to open the matching exams.
                        </Typography>
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' },
                                gap: 2,
                            }}
                        >
                            {WEB_GRADE_APPS.map((app) => (
                                <AppProgramCard
                                    key={app.package}
                                    appPackage={app.package}
                                    label={app.label}
                                    selected={selectedPackage === app.package}
                                    onSelect={() => setSelectedPackage(app.package)}
                                />
                            ))}
                        </Box>
                        {selectedApp && (
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                    {selectedApp.label} grades
                                </Typography>
                                {gradesLoading ? (
                                    <CircularProgress size={28} />
                                ) : gradesForApp.length === 0 ? (
                                    <Typography color="text.secondary">
                                        No grades are available for this app yet.
                                    </Typography>
                                ) : (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                                        {gradesForApp.map((grade) => (
                                            <Button
                                                key={grade.id}
                                                variant="contained"
                                                endIcon={<ArrowForward />}
                                                onClick={() => {
                                                    setSelectedGrade(grade.id);
                                                    router.push(`/exams?grade=${grade.id}`);
                                                }}
                                            >
                                                {grade.name}
                                            </Button>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Box>
                )}
                {!!gradeId && (
                <>
                {/* Header Section */}
                <Box sx={{ mb: 6 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                        }}
                    >
                        Practice Exams
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Choose from our comprehensive collection of practice exams to test your knowledge
                    </Typography>

                    {/* Filters */}
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                placeholder="Search exams..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth
                                select
                                label="Exam Type"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                {examTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type === 'all' ? 'All Types' : type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth
                                select
                                label="Subject"
                                value={filterSubject}
                                onChange={(e) => setFilterSubject(e.target.value)}
                            >
                                {subjects.map((subject) => (
                                    <MenuItem key={subject} value={subject}>
                                        {subject === 'all' ? 'All Subjects' : subject}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </Box>

                {/* Loading State */}
                {isLoading && (
                    <Grid container spacing={3}>
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                                <Card>
                                    <Skeleton variant="rectangular" height={200} />
                                    <CardContent>
                                        <Skeleton variant="text" height={40} />
                                        <Skeleton variant="text" height={20} />
                                        <Skeleton variant="text" height={20} />
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}

                {/* Error State */}
                {error && (
                    <Alert severity="error" sx={{ mb: 4 }}>
                        Failed to load exams. Please try again later.
                    </Alert>
                )}

                {/* Exams Grid */}
                {!isLoading && !error && (
                    <>
                        {filteredExams.length === 0 ? (
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    py: 8,
                                }}
                            >
                                <Assessment sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
                                <Typography variant="h6" color="text.secondary">
                                    No exams found
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Try adjusting your search or filters
                                </Typography>
                            </Box>
                        ) : (
                            <Stack spacing={2}>
                                {filteredExams.map((exam) => (
                                    <Box
                                        key={exam.id}
                                        component="article"
                                        sx={{
                                            display: 'flex',
                                            flexDirection: { xs: 'column', sm: 'row' },
                                            borderRadius: 2,
                                            overflow: 'hidden',
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            backgroundColor: 'background.paper',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                            },
                                        }}
                                    >
                                        {/* Left side - Image/Icon */}
                                        <Box
                                            sx={{
                                                width: { xs: '100%', sm: 120 },
                                                height: { xs: 120, sm: 'auto' },
                                                minHeight: { sm: 120 },
                                                background: exam.image
                                                    ? `linear-gradient(120deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1)), url(${exam.image})`
                                                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                position: 'relative',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                            }}
                                        >
                                            {!exam.image && (
                                                <Assessment sx={{ fontSize: 48, color: 'white', opacity: 0.7 }} />
                                            )}
                                            {exam.isLocked && (
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 8,
                                                        right: 8,
                                                        backgroundColor: 'rgba(0,0,0,0.6)',
                                                        borderRadius: 1,
                                                        p: 0.5,
                                                    }}
                                                >
                                                    <Lock sx={{ color: 'white', fontSize: 16 }} />
                                                </Box>
                                            )}
                                        </Box>

                                        {/* Middle - Content */}
                                        <Box sx={{ flex: 1, p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                            <Box>
                                                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                                                    <Chip
                                                        label={exam.examType}
                                                        size="small"
                                                        color="primary"
                                                        sx={{ fontWeight: 600, textTransform: 'capitalize', height: 24 }}
                                                    />
                                                    {exam.subject && (
                                                        <Chip
                                                            label={exam.subject.name}
                                                            size="small"
                                                            variant="outlined"
                                                            color="secondary"
                                                            sx={{ height: 24 }}
                                                        />
                                                    )}
                                                    {exam.hasUserAttempted && (
                                                        <Chip
                                                            label="Attempted"
                                                            size="small"
                                                            color="success"
                                                            sx={{ fontWeight: 600, height: 24 }}
                                                        />
                                                    )}
                                                </Stack>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: '1.1rem',
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    {exam.name}
                                                </Typography>
                                                {exam.year && (
                                                    <Typography variant="caption" color="text.secondary">
                                                        Year: {exam.year}
                                                    </Typography>
                                                )}
                                            </Box>
                                            <Stack direction="row" spacing={3} sx={{ color: 'text.secondary' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                                    <Quiz sx={{ fontSize: 18 }} />
                                                    <Typography variant="body2">
                                                        {exam.totalQuestions || 0} Questions
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                                    <Timer sx={{ fontSize: 18 }} />
                                                    <Typography variant="body2">
                                                        {exam.givenTimeInMinutes} min
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                        </Box>

                                        {/* Right side - Action */}
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                p: 2.5,
                                                borderTop: { xs: '1px solid', sm: 'none' },
                                                borderLeft: { xs: 'none', sm: '1px solid' },
                                                borderColor: 'divider',
                                            }}
                                        >
                                            <Button
                                                variant="contained"
                                                size="medium"
                                                disabled={exam.isLocked}
                                                startIcon={exam.isLocked ? <Lock /> : exam.hasUserAttempted ? <CheckCircle /> : <LockOpen />}
                                                onClick={() => handleOpenExam(exam.id)}
                                                sx={{
                                                    minWidth: { xs: '100%', sm: 140 },
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {exam.isLocked ? 'Locked' : exam.hasUserAttempted ? 'View Result' : 'Start Exam'}
                                            </Button>
                                        </Box>
                                    </Box>
                                ))}
                            </Stack>
                        )}
                    </>
                )}

                {/* Stats Section */}
                {!isLoading && !error && exams && exams.length > 0 && (
                    <Box
                        sx={{
                            mt: 8,
                            p: 4,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: 4,
                            color: 'white',
                        }}
                    >
                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                                        {exams.length}
                                    </Typography>
                                    <Typography variant="body1">Total Exams Available</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                                        {exams.reduce((acc, exam) => acc + (exam.totalQuestions || 0), 0)}
                                    </Typography>
                                    <Typography variant="body1">Total Questions</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                                        {examTypes.length - 1}
                                    </Typography>
                                    <Typography variant="body1">Exam Categories</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                )}

                {/* CTA Section */}
                <Box
                    sx={{
                        mt: 8,
                        p: 4,
                        backgroundColor: 'background.paper',
                        borderRadius: 4,
                        textAlign: 'center',
                    }}
                >
                    <TrendingUp sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                        Track Your Progress
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        Check the leaderboard to see how you rank against other students
                    </Typography>
                    <Button
                        component={Link}
                        href="/leaderboard"
                        variant="contained"
                        size="large"
                        sx={{ px: 4 }}
                    >
                        View Leaderboard
                    </Button>
                </Box>
                </>
                )}
            </Container>
        </Box>
    );
}


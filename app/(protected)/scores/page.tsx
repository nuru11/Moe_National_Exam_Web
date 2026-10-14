'use client';

import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    TextField,
    MenuItem,
    Alert,
    CircularProgress,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Stack,
    Divider,
} from '@mui/material';
import {
    Assessment,
    TrendingUp,
    Score,
    CheckCircle,
    Cancel,
} from '@mui/icons-material';
import { useUserScore, useCompetitions, useUserStats } from '@/lib/api/hooks';

export default function ScoresPage() {
    const [selectedCompetitionId, setSelectedCompetitionId] = useState<number | ''>('');
    const { data: competitions, isLoading: loadingCompetitions } = useCompetitions();
    const { data: userScore, isLoading: loadingScore, error: scoreError } = useUserScore(
        selectedCompetitionId ? String(selectedCompetitionId) : ''
    );
    const { data: userStats } = useUserStats();

    const handleCompetitionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCompetitionId(event.target.value ? Number(event.target.value) : '');
    };

    const calculatePercentage = (score: number, total: number) => {
        if (total === 0) return 0;
        return Math.round((score / total) * 100);
    };

    const getScoreColor = (score: number, total: number) => {
        const percentage = calculatePercentage(score, total);
        if (percentage >= 80) return 'success';
        if (percentage >= 60) return 'warning';
        return 'error';
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
                {/* Header Section */}
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                        }}
                    >
                        My Scores
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        View your exam results and track your performance across competitions
                    </Typography>
                </Box>

                {/* Overall Stats Card */}
                {userStats && (
                    <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                        <CardContent>
                            <Grid container spacing={4}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Assessment sx={{ fontSize: 40, mb: 1, opacity: 0.9 }} />
                                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                                            {userStats.total_exams_taken}
                                        </Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                            Exams Taken
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Score sx={{ fontSize: 40, mb: 1, opacity: 0.9 }} />
                                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                                            {userStats.total_score}
                                        </Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                            Total Score
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                )}

                {/* Competition Selector */}
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <TextField
                            fullWidth
                            select
                            label="Select Competition"
                            value={selectedCompetitionId}
                            onChange={handleCompetitionChange}
                            disabled={loadingCompetitions}
                            sx={{ mb: 2 }}
                        >
                            <MenuItem value="">
                                <em>Select a competition to view scores...</em>
                            </MenuItem>
                            {competitions?.map((competition) => (
                                <MenuItem key={competition.id} value={competition.id}>
                                    {competition.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </CardContent>
                </Card>

                {/* Loading State */}
                {loadingScore && selectedCompetitionId && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                        <CircularProgress />
                    </Box>
                )}

                {/* Error State */}
                {scoreError && selectedCompetitionId && (
                    <Alert severity="error" sx={{ mb: 4 }}>
                        Failed to load scores. Please try again later.
                    </Alert>
                )}

                {/* No Competition Selected */}
                {!selectedCompetitionId && !loadingScore && (
                    <Card>
                        <CardContent>
                            <Box sx={{ textAlign: 'center', py: 6 }}>
                                <Assessment sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
                                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                                    No Competition Selected
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Please select a competition from the dropdown above to view your scores
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                )}

                {/* Scores Display */}
                {userScore && selectedCompetitionId && !loadingScore && (
                    <>
                        {/* Check if user has attempted the competition */}
                        {!userScore.hasUserAttempted ? (
                            <Card>
                                <CardContent>
                                    <Box sx={{ textAlign: 'center', py: 6 }}>
                                        <Cancel sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
                                        <Typography variant="h5" color="error" sx={{ mb: 1, fontWeight: 600 }}>
                                            You didn&apos;t complete it
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            You haven&apos;t attempted this competition yet. Please complete the competition to view your scores.
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        ) : (
                            <>
                                

                                {/* Exam Results Table */}
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                                            Exam Results
                                        </Typography>
                                        {userScore.exams && userScore.exams.length > 0 ? (
                                            <TableContainer component={Paper} variant="outlined">
                                                <Table>
                                                    <TableHead>
                                                        <TableRow sx={{ backgroundColor: 'action.hover' }}>
                                                            <TableCell sx={{ fontWeight: 600 }}>Exam Name</TableCell>
                                                            <TableCell align="center" sx={{ fontWeight: 600 }}>
                                                                Score
                                                            </TableCell>
                                                            <TableCell align="center" sx={{ fontWeight: 600 }}>
                                                                Total Questions
                                                            </TableCell>
                                                            <TableCell align="center" sx={{ fontWeight: 600 }}>
                                                                Percentage
                                                            </TableCell>
                                                            <TableCell align="center" sx={{ fontWeight: 600 }}>
                                                                Status
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {userScore.exams.map((exam) => {
                                                            const percentage = calculatePercentage(exam.score, exam.totalQuestions);
                                                            const scoreColor = getScoreColor(exam.score, exam.totalQuestions);
                                                            return (
                                                                <TableRow
                                                                    key={exam.id}
                                                                    sx={{
                                                                        '&:hover': {
                                                                            backgroundColor: 'action.hover',
                                                                        },
                                                                    }}
                                                                >
                                                                    <TableCell>
                                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                                            <Assessment sx={{ fontSize: 20, color: 'primary.main' }} />
                                                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                                                {exam.examName}
                                                                            </Typography>
                                                                        </Stack>
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        <Typography
                                                                            variant="h6"
                                                                            sx={{ fontWeight: 600, color: `${scoreColor}.main` }}
                                                                        >
                                                                            {exam.score}
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        <Typography variant="body1" color="text.secondary">
                                                                            {exam.totalQuestions}
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        <Chip
                                                                            label={`${percentage}%`}
                                                                            color={scoreColor}
                                                                            size="small"
                                                                            sx={{ fontWeight: 600 }}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        {percentage >= 60 ? (
                                                                            <Chip
                                                                                icon={<CheckCircle />}
                                                                                label="Passed"
                                                                                color="success"
                                                                                size="small"
                                                                            />
                                                                        ) : (
                                                                            <Chip
                                                                                icon={<Cancel />}
                                                                                label="Failed"
                                                                                color="error"
                                                                                size="small"
                                                                            />
                                                                        )}
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        })}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        ) : (
                                            <Alert severity="info" sx={{ mt: 2 }}>
                                                No exam results found for this competition.
                                            </Alert>
                                        )}

                                        {/* Summary Stats */}
                                        {userScore.exams && userScore.exams.length > 0 && (
                                            <>
                                                <Divider sx={{ my: 3 }} />
                                                <Grid container spacing={3}>
                                                    <Grid size={{ xs: 12, sm: 4 }}>
                                                        <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'action.hover', borderRadius: 2 }}>
                                                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                                                                {userScore.exams.length}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Exams Completed
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid size={{ xs: 12, sm: 4 }}>
                                                        <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'action.hover', borderRadius: 2 }}>
                                                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                                                                {userScore.exams.reduce((acc, exam) => acc + exam.totalQuestions, 0)}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Total Questions
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid size={{ xs: 12, sm: 4 }}>
                                                        <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'action.hover', borderRadius: 2 }}>
                                                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                                                                {Math.round(
                                                                    (userScore.exams.reduce((acc, exam) => acc + exam.score, 0) /
                                                                        userScore.exams.reduce((acc, exam) => acc + exam.totalQuestions, 0)) *
                                                                    100
                                                                ) || 0}
                                                                %
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Average Score
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>
                            </>
                        )}
                    </>
                )}
            </Container>
        </Box>
    );
}


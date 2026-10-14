'use client';

import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Avatar,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    CircularProgress,
    Alert,
    TextField,
    MenuItem,
    Stack,
    useTheme,
    Grid,
} from '@mui/material';
import {
    EmojiEvents,
    Assessment,
    Star,
} from '@mui/icons-material';
import { useLeaderboard, useExams, useCompetitions } from '@/lib/api/hooks';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

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
            id={`leaderboard-tabpanel-${index}`}
            aria-labelledby={`leaderboard-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ mt: 3 }}>{children}</Box>}
        </div>
    );
}

export default function LeaderboardPage() {
    const theme = useTheme();
    const router = useRouter();
    const { user } = useAuthStore();
    const [tabValue, setTabValue] = useState(0);
    const [selectedExamId, setSelectedExamId] = useState<number | undefined>(undefined);
    const [selectedCompetitionId, setSelectedCompetitionId] = useState<number | undefined>(undefined);

    const { data: examLeaderboard, isLoading: loadingExam } = useLeaderboard('exam', selectedExamId);
    const { data: competitionLeaderboard, isLoading: loadingCompetition } = useLeaderboard('competition', selectedCompetitionId);
    const { data: exams } = useExams(user?.grade?.id || 0);
    const { data: competitions } = useCompetitions();

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };



    const getMedalColor = (rank: number) => {
        switch (rank) {
            case 1:
                return '#FFD700'; // Gold
            case 2:
                return '#C0C0C0'; // Silver
            case 3:
                return '#CD7F32'; // Bronze
            default:
                return theme.palette.text.secondary;
        }
    };

    const getMedalIcon = (rank: number) => {
        if (rank <= 3) {
            return <EmojiEvents sx={{ color: getMedalColor(rank), fontSize: 28 }} />;
        }
        return null;
    };

    const renderLeaderboardTable = (
        data: typeof examLeaderboard,
        isLoading: boolean,
        emptyMessage: string
    ) => {
        if (isLoading) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <CircularProgress />
                </Box>
            );
        }

        if (!data || data.length === 0) {
            return (
                <Alert severity="info" sx={{ mt: 2 }}>
                    {emptyMessage}
                </Alert>
            );
        }

        // Find current user's rank
        const userEntry = data.find((entry) => entry.userId === user?.id);

        return (
            <>
                {/* Top 3 Podium */}
                {data.length >= 3 && (
                    <Box sx={{ mb: 4 }}>
                        <Grid container spacing={2} justifyContent="center" alignItems="flex-end">
                            {/* 2nd Place */}
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <Card
                                    sx={{
                                        p: 3,
                                        textAlign: 'center',
                                        backgroundColor: 'background.paper',
                                        border: `2px solid ${getMedalColor(2)}`,
                                        height: 200,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Avatar
                                        src={data[1].userImage || undefined}
                                        sx={{
                                            width: 70,
                                            height: 70,
                                            mx: 'auto',
                                            mb: 2,
                                            border: `3px solid ${getMedalColor(2)}`,
                                        }}
                                    >
                                        {data[1].userName[0]}
                                    </Avatar>
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                        {data[1].userName}
                                    </Typography>
                                    <Chip
                                        icon={<EmojiEvents />}
                                        label={`${data[1].score} pts`}
                                        sx={{
                                            backgroundColor: `${getMedalColor(2)}20`,
                                            color: getMedalColor(2),
                                            fontWeight: 700,
                                        }}
                                    />
                                </Card>
                            </Grid>

                            {/* 1st Place */}
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <Card
                                    sx={{
                                        p: 3,
                                        textAlign: 'center',
                                        backgroundColor: 'background.paper',
                                        border: `3px solid ${getMedalColor(1)}`,
                                        height: 240,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        '&::before': {
                                            content: '"👑"',
                                            position: 'absolute',
                                            top: -20,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            fontSize: 40,
                                        },
                                    }}
                                >
                                    <Avatar
                                        src={data[0].userImage || undefined}
                                        sx={{
                                            width: 90,
                                            height: 90,
                                            mx: 'auto',
                                            mb: 2,
                                            border: `4px solid ${getMedalColor(1)}`,
                                        }}
                                    >
                                        {data[0].userName[0]}
                                    </Avatar>
                                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                                        {data[0].userName}
                                    </Typography>
                                    <Chip
                                        icon={<Star />}
                                        label={`${data[0].score} pts`}
                                        sx={{
                                            backgroundColor: `${getMedalColor(1)}20`,
                                            color: getMedalColor(1),
                                            fontWeight: 700,
                                            fontSize: '1rem',
                                        }}
                                    />
                                </Card>
                            </Grid>

                            {/* 3rd Place */}
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <Card
                                    sx={{
                                        p: 3,
                                        textAlign: 'center',
                                        backgroundColor: 'background.paper',
                                        border: `2px solid ${getMedalColor(3)}`,
                                        height: 180,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Avatar
                                        src={data[2].userImage || undefined}
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            mx: 'auto',
                                            mb: 2,
                                            border: `3px solid ${getMedalColor(3)}`,
                                        }}
                                    >
                                        {data[2].userName[0]}
                                    </Avatar>
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                        {data[2].userName}
                                    </Typography>
                                    <Chip
                                        icon={<EmojiEvents />}
                                        label={`${data[2].score} pts`}
                                        sx={{
                                            backgroundColor: `${getMedalColor(3)}20`,
                                            color: getMedalColor(3),
                                            fontWeight: 700,
                                        }}
                                    />
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                )}

                {/* Full Leaderboard Table */}
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'primary.main' }}>
                                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Rank</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Student</TableCell>
                                <TableCell align="right" sx={{ color: 'white', fontWeight: 700 }}>
                                    Score
                                </TableCell>
                                {tabValue === 0 && (
                                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Exam</TableCell>
                                )}
                                {tabValue === 1 && (
                                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Competition</TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((entry) => {
                                const isCurrentUser = entry.userId === user?.id;
                                return (
                                    <TableRow
                                        key={`${entry.rank}-${entry.userId}`}
                                        sx={{
                                            backgroundColor: isCurrentUser
                                                ? 'primary.light'
                                                : entry.rank % 2 === 0
                                                    ? 'action.hover'
                                                    : 'background.paper',
                                            '&:hover': {
                                                backgroundColor: isCurrentUser ? 'primary.light' : 'action.selected',
                                            },
                                        }}
                                    >
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                {getMedalIcon(entry.rank)}
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: entry.rank <= 3 ? 700 : 600,
                                                        color: getMedalColor(entry.rank),
                                                    }}
                                                >
                                                    #{entry.rank}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar
                                                    src={entry.userImage || undefined}
                                                    sx={{ width: 40, height: 40 }}
                                                >
                                                    {entry.userName[0]}
                                                </Avatar>
                                                <Box>
                                                    <Typography
                                                        variant="body1"
                                                        sx={{ fontWeight: isCurrentUser ? 700 : 500 }}
                                                    >
                                                        {entry.userName}
                                                        {isCurrentUser && (
                                                            <Chip
                                                                label="You"
                                                                size="small"
                                                                color="primary"
                                                                sx={{ ml: 1, height: 20 }}
                                                            />
                                                        )}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Chip
                                                label={`${entry.score} pts`}
                                                color={entry.rank <= 10 ? 'primary' : 'default'}
                                                sx={{ fontWeight: 700 }}
                                            />
                                        </TableCell>
                                        {tabValue === 0 && (
                                            <TableCell>
                                                <Typography variant="body2" color="text.secondary">
                                                    {entry.examName || 'N/A'}
                                                </Typography>
                                            </TableCell>
                                        )}
                                        {tabValue === 1 && (
                                            <TableCell>
                                                <Typography variant="body2" color="text.secondary">
                                                    {entry.competitionName || 'N/A'}
                                                </Typography>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* User's Rank Card */}
                {userEntry && (
                    <Card
                        sx={{
                            mt: 4,
                            p: 3,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar
                                    src={userEntry.userImage || undefined}
                                    sx={{ width: 60, height: 60, border: '3px solid white' }}
                                >
                                    {userEntry.userName[0]}
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                        Your Rank: #{userEntry.rank}
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                        Keep practicing to improve your position!
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ textAlign: 'right' }}>
                                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                    {userEntry.score}
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                    points
                                </Typography>
                            </Box>
                        </Box>
                    </Card>
                )}
            </>
        );
    };

    return (
        <>
            <Box
                sx={{
                    minHeight: '100vh',
                    backgroundColor: 'background.default',
                    pt: 12,
                    pb: 8,
                }}
            >
                <Container maxWidth="lg">
                    {/* Header */}
                    <Box sx={{ mb: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <EmojiEvents sx={{ fontSize: 48, color: 'primary.main' }} />
                            <Typography variant="h3" sx={{ fontWeight: 700 }}>
                                Leaderboard
                            </Typography>
                        </Box>
                        <Typography variant="body1" color="text.secondary">
                            Compete with students worldwide and track your progress
                        </Typography>
                    </Box>

                    {/* Stats Cards */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Card>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Box
                                            sx={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 2,
                                                backgroundColor: 'secondary.light',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Assessment sx={{ fontSize: 32, color: 'secondary.main' }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                                {exams?.length || 0}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Active Exams
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Card>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Box
                                            sx={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 2,
                                                backgroundColor: 'success.light',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <EmojiEvents sx={{ fontSize: 32, color: 'success.main' }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                                {competitions?.length || 0}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Competitions
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Tabs */}
                    <Card>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
                                <Tab label="By Exam" icon={<Assessment />} iconPosition="start" />
                                <Tab label="By Competition" icon={<Star />} iconPosition="start" />
                            </Tabs>
                        </Box>

                        <Box sx={{ p: 3 }}>
                            {/* Exam Leaderboard */}
                            <TabPanel value={tabValue} index={0}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Select Exam"
                                    value={selectedExamId || ''}
                                    onChange={(e) => setSelectedExamId(Number(e.target.value))}
                                    sx={{ mb: 3 }}
                                >
                                    <MenuItem value="">Select an exam...</MenuItem>
                                    {exams?.map((exam) => (
                                        <MenuItem key={exam.id} value={exam.id}>
                                            {exam.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                {selectedExamId ? (
                                    renderLeaderboardTable(
                                        examLeaderboard,
                                        loadingExam,
                                        'No one has completed this exam yet. Be the first!'
                                    )
                                ) : (
                                    <Alert severity="info">Please select an exam to view its leaderboard</Alert>
                                )}
                            </TabPanel>

                            {/* Competition Leaderboard */}
                            <TabPanel value={tabValue} index={1}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Select Competition"
                                    value={selectedCompetitionId || ''}
                                    onChange={(e) => setSelectedCompetitionId(Number(e.target.value))}
                                    sx={{ mb: 3 }}
                                >
                                    <MenuItem value="">Select a competition...</MenuItem>
                                    {competitions?.map((competition) => (
                                        <MenuItem key={competition.id} value={competition.id}>
                                            {competition.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                {selectedCompetitionId ? (
                                    renderLeaderboardTable(
                                        competitionLeaderboard,
                                        loadingCompetition,
                                        'No participants in this competition yet!'
                                    )
                                ) : (
                                    <Alert severity="info">
                                        Please select a competition to view its leaderboard
                                    </Alert>
                                )}
                            </TabPanel>
                        </Box>
                    </Card>
                </Container>
            </Box>
        </>
    );
}


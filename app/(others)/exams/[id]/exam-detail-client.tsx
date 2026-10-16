'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    RadioGroup,
    Radio,
    FormControlLabel,
    LinearProgress,
    Chip,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stack,
    Paper,
    Divider,
    CircularProgress,
} from '@mui/material';
import {
    Timer,
    CheckCircle,
    Assessment,
    Send,
    ArrowBack,
    CheckCircleOutline,
    Cancel,
    EmojiEvents,
    Flag,
} from '@mui/icons-material';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useExam, useQuestions, useBulkSubmitAnswers, useSubmitExam } from '@/lib/api/hooks';
import { QuestionResponse } from '@/lib/types';
import Image from 'next/image';
import LatexRenderer from '@/components/LatexRenderer';
import { useAuthStore } from '@/store/authStore';

export default function ExamDetailPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const examId = Number(params.id);
    const gradeId = Number(searchParams.get('grade')) || undefined;
    const { isAuthenticated } = useAuthStore();
    const [authReady, setAuthReady] = useState(false);
    const examsPath = gradeId ? `/exams?grade=${gradeId}` : '/exams';

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

    const { data: exam, isLoading, error } = useExam(examId, gradeId);
    const bulkSubmitAnswersMutation = useBulkSubmitAnswers();
    const submitExamMutation = useSubmitExam();

    const [examStarted, setExamStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
    const [flaggedQuestionIds, setFlaggedQuestionIds] = useState<number[]>([]);
    const [timeRemaining, setTimeRemaining] = useState<number>(0);
    const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
    const [examCompleted, setExamCompleted] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [examScore, setExamScore] = useState<{ correct: number; total: number } | null>(null);
    const timerInitialized = useRef(false);

    const { data: questions, isLoading: isQuestionsLoading, error: questionsError } = useQuestions(examId, authReady && isAuthenticated);


    const unansweredQuestions = questions?.filter((question) => !question.hasUserAnswered);
    useEffect(() => {
        if (exam && examStarted && !timerInitialized.current) {
            timerInitialized.current = true;
            // Defer setState to avoid synchronous state updates in effects
            queueMicrotask(() => {
                setTimeRemaining(exam.givenTimeInMinutes * 60); // Convert to seconds
            });
        }
    }, [exam, examStarted]);

    useEffect(() => {
        if (timeRemaining <= 0 || !exam || examCompleted) return;

        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    handleSubmitExam();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemaining, exam, examCompleted]);

    // Guests can read the overview before questions load. Signed-in visitors wait for questions.
    if (!authReady || isLoading || (isAuthenticated && isQuestionsLoading)) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', gap: 2 }}>
                <LinearProgress sx={{ width: 300 }} />
                <Typography variant="body2" color="text.secondary">
                    {!authReady || isLoading ? 'Loading exam...' : 'Loading questions...'}
                </Typography>
            </Box>
        );
    }

    // Show error if exam failed to load
    if (error || !exam) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    Failed to load exam. Please try again.
                </Alert>
                <Button variant="outlined" onClick={() => router.push(examsPath)}>
                    Back to Exams
                </Button>
            </Container>
        );
    }

    // Show error if questions failed to load
    if (isAuthenticated && questionsError && !exam.hasUserAttempted) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    Failed to load exam questions. Please try again.
                </Alert>
                <Button variant="outlined" onClick={() => router.push(examsPath)}>
                    Back to Exams
                </Button>
            </Container>
        );
    }

    // Show empty state if there are no questions
    if (isAuthenticated && !exam.hasUserAttempted && (!unansweredQuestions || unansweredQuestions.length === 0)) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Assessment sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                        No Questions Available
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        This exam doesn&apos;t have any questions yet. Please check back later or contact support.
                    </Typography>
                    <Button variant="contained" onClick={() => router.push(examsPath)}>
                        Back to Exams
                    </Button>
                </Paper>
            </Container>
        );
    }

    const currentQuestion = examStarted ? unansweredQuestions?.[currentQuestionIndex] : null;
    const progress = examStarted ? ((currentQuestionIndex + 1) / (unansweredQuestions?.length || 0)) * 100 : 0;
    const answeredCount = Object.keys(selectedAnswers).length;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStartExam = () => {
        if (!authReady) {
            return;
        }
        if (exam.hasUserAttempted) {
            return;
        }
        if (!isAuthenticated) {
            const returnPath = gradeId ? `/exams/${examId}?grade=${gradeId}` : `/exams/${examId}`;
            const params = new URLSearchParams({
                tab: 'signup',
                return: returnPath,
            });
            if (gradeId) {
                params.set('grade', String(gradeId));
            }
            router.push(`/signIn?${params.toString()}`);
            return;
        }
        setExamStarted(true);
    };

    const handleAnswerSelect = (choiceId: number) => {
        if (!currentQuestion) return;
        setSelectedAnswers({
            ...selectedAnswers,
            [currentQuestion.id]: choiceId,
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < (unansweredQuestions?.length || 0) - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const toggleFlag = () => {
        if (!currentQuestion) {
            return;
        }
        setFlaggedQuestionIds((current) =>
            current.includes(currentQuestion.id)
                ? current.filter((id) => id !== currentQuestion.id)
                : [...current, currentQuestion.id]
        );
    };

    const calculateScore = () => {
        if (!questions) return { correct: 0, total: 0 };
        
        let correct = 0;
        const total = questions.length;

        questions.forEach((question) => {
            const userAnswerId = selectedAnswers[question.id];
            if (userAnswerId) {
                const userChoice = question.choices.find((c) => c.id === userAnswerId);
                if (userChoice && userChoice.isCorrect) {
                    correct++;
                }
            }
        });

        return { correct, total };
    };

    const handleSubmitExam = async () => {
        setExamCompleted(true);
        try {
            // Convert selectedAnswers to array format for bulk submit
            const answersArray = Object.entries(selectedAnswers).map(([questionId, choiceId]) => ({
                question: Number(questionId),
                answer: choiceId,
                exam: examId,
            }));

            // Submit all answers in bulk
            if (answersArray.length > 0) {
                await bulkSubmitAnswersMutation.mutateAsync(answersArray);
            }

            // Then submit the exam
            await submitExamMutation.mutateAsync(examId);
            
            // Calculate score and show review
            const score = calculateScore();
            setExamScore(score);
            setIsSubmitDialogOpen(false);
            setShowReview(true);
        } catch (err) {
            console.error('Failed to submit exam:', err);
            setExamCompleted(false);
        }
    };

    const getTimeColor = () => {
        const percentage = (timeRemaining / (exam.givenTimeInMinutes * 60)) * 100;
        if (percentage > 50) return 'success';
        if (percentage > 20) return 'warning';
        return 'error';
    };

    const isAnswerCorrect = (question: QuestionResponse, userAnswerId: number | undefined) => {
        if (!userAnswerId) return false;
        const userChoice = question.choices.find((c) => c.id === userAnswerId);
        return userChoice?.isCorrect || false;
    };

    const getCorrectAnswer = (question: QuestionResponse) => {
        return question.choices.find((c) => c.isCorrect);
    };

    // Show review screen after exam completion
    if (showReview && examScore && questions) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    backgroundColor: 'background.default',
                    pt: 4,
                    pb: 8,
                }}
            >
                <Container maxWidth="lg">
                    {/* Score Summary Card */}
                    <Paper
                        sx={{
                            p: 4,
                            mb: 4,
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                        }}
                    >
                        <EmojiEvents sx={{ fontSize: 80, mb: 2 }} />
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                            Exam Completed!
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                            Your Score: {examScore.correct} / {examScore.total}
                        </Typography>
                        <Typography variant="h6" sx={{ opacity: 0.9 }}>
                            {((examScore.correct / examScore.total) * 100).toFixed(1)}%
                        </Typography>
                    </Paper>

                    {/* Review Questions */}
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                        Review Your Answers
                    </Typography>

                    {questions.map((question, index) => {
                        const userAnswerId = selectedAnswers[question.id];
                        const isCorrect = isAnswerCorrect(question, userAnswerId);
                        const correctAnswer = getCorrectAnswer(question);
                        const userAnswer = userAnswerId
                            ? question.choices.find((c) => c.id === userAnswerId)
                            : null;

                        return (
                            <Card key={question.id} sx={{ mb: 3 }}>
                                <CardContent sx={{ p: 4 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            Question {index + 1}
                                        </Typography>
                                        <Chip
                                            icon={isCorrect ? <CheckCircleOutline /> : <Cancel />}
                                            label={isCorrect ? 'Correct' : 'Incorrect'}
                                            color={isCorrect ? 'success' : 'error'}
                                            sx={{ fontWeight: 600 }}
                                        />
                                    </Box>
                                    <Divider sx={{ mb: 3 }} />

                                    <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.8 }}>
                                        <LatexRenderer content={question.content} />
                                    </Typography>

                                    {question.image && (
                                        <Box sx={{ mb: 3, position: 'relative', width: '100%', height: 300 }}>
                                            <Image
                                                src={question.image}
                                                alt="Question image"
                                                fill
                                                style={{ objectFit: 'contain' }}
                                            />
                                        </Box>
                                    )}

                                    <Stack spacing={2} sx={{ mb: 3 }}>
                                        {question.choices.map((choice, choiceIndex) => {
                                            const isUserAnswer = choice.id === userAnswerId;
                                            const isCorrectChoice = choice.isCorrect;
                                            const letter = String.fromCharCode(65 + choiceIndex);

                                            let borderColor = 'divider';
                                            let backgroundColor = 'transparent';
                                            let chipColor: 'default' | 'primary' | 'success' | 'error' = 'default';

                                            if (isCorrectChoice) {
                                                borderColor = 'success.main';
                                                backgroundColor = 'success.light';
                                                chipColor = 'success';
                                            } else if (isUserAnswer && !isCorrectChoice) {
                                                borderColor = 'error.main';
                                                backgroundColor = 'error.light';
                                                chipColor = 'error';
                                            } else if (isUserAnswer) {
                                                borderColor = 'primary.main';
                                                chipColor = 'primary';
                                            }

                                            return (
                                                <Paper
                                                    key={choice.id}
                                                    sx={{
                                                        p: 2,
                                                        border: '2px solid',
                                                        borderColor,
                                                        backgroundColor,
                                                        transition: 'all 0.2s ease',
                                                    }}
                                                >
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        <Chip
                                                            label={letter}
                                                            size="small"
                                                            color={chipColor}
                                                        />
                                                        <Typography variant="body1" sx={{ flex: 1 }}>
                                                            <LatexRenderer content={choice.content} />
                                                        </Typography>
                                                        {isCorrectChoice && (
                                                            <CheckCircle sx={{ color: 'success.main' }} />
                                                        )}
                                                        {isUserAnswer && !isCorrectChoice && (
                                                            <Cancel sx={{ color: 'error.main' }} />
                                                        )}
                                                    </Box>
                                                </Paper>
                                            );
                                        })}
                                    </Stack>

                                    {/* Answer Summary */}
                                    <Alert
                                        severity={isCorrect ? 'success' : 'error'}
                                        sx={{ mb: 2 }}
                                    >
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                            {isCorrect ? 'Correct Answer!' : userAnswerId ? 'Incorrect Answer' : 'Not Answered'}
                                        </Typography>
                                        {!userAnswerId && (
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                You did not answer this question.
                                            </Typography>
                                        )}
                                        {!isCorrect && userAnswer && (
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                Your answer: <strong>{userAnswer.content}</strong>
                                            </Typography>
                                        )}
                                        {correctAnswer && (
                                            <Typography variant="body2">
                                                Correct answer: <strong>{correctAnswer.content}</strong>
                                            </Typography>
                                        )}
                                    </Alert>

                                    {/* Explanation */}
                                    {question.explanation && (
                                        <Alert severity="info">
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                                Explanation:
                                            </Typography>
                                            <Typography variant="body2">
                                                <LatexRenderer content={question.explanation} />
                                            </Typography>
                                        </Alert>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}

                    {/* Back Button */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<ArrowBack />}
                            onClick={() => router.push(examsPath)}
                            sx={{ px: 4 }}
                        >
                            Back to Exams
                        </Button>
                    </Box>
                </Container>
            </Box>
        );
    }

    // Show exam details screen before starting
    if (!examStarted) {
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
                    <Container maxWidth="md">
                        <Paper sx={{ p: 4 }}>
                            <Box sx={{ textAlign: 'center', mb: 4 }}>
                                <Assessment sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
                                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                                    {exam.name}
                                </Typography>
                                {exam.year && (
                                    <Typography variant="body1" color="text.secondary">
                                        Year: {exam.year}
                                    </Typography>
                                )}
                            </Box>

                            <Divider sx={{ my: 3 }} />

                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                                    Exam Details
                                </Typography>
                                <Stack spacing={2}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body1" color="text.secondary">
                                            Total Questions
                                        </Typography>
                                        {isQuestionsLoading ? (
                                            <CircularProgress size={24} />
                                        ) : (
                                            <Chip label={questions?.length ?? exam.totalQuestions ?? 0} color="primary" />
                                        )}
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body1" color="text.secondary">
                                            Time Limit
                                        </Typography>
                                        <Chip label={`${exam.givenTimeInMinutes} minutes`} color="secondary" />
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body1" color="text.secondary">
                                            Exam Type
                                        </Typography>
                                        <Chip label={exam.examType} variant="outlined" />
                                    </Box>
                                    {exam.subject && (
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="body1" color="text.secondary">
                                                Subject
                                            </Typography>
                                            <Chip label={exam.subject.name} variant="outlined" color="secondary" />
                                        </Box>
                                    )}
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body1" color="text.secondary">
                                            Status
                                        </Typography>
                                        <Chip
                                            label={exam.hasUserAttempted ? "Attempted" : "Not Attempted"}
                                            color={exam.hasUserAttempted ? "success" : "default"}
                                            icon={exam.hasUserAttempted ? <CheckCircle /> : undefined}
                                        />
                                    </Box>
                                </Stack>
                            </Box>

                            <Divider sx={{ my: 3 }} />

                            {exam.hasUserAttempted ? (
                                <Box sx={{ textAlign: 'center', mb: 3 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                                        Your result
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                                        {exam.userResult?.correctAnswers ?? 0} / {exam.userResult?.totalQuestions ?? 0}
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary">
                                        {exam.userResult && exam.userResult.totalQuestions > 0
                                            ? ((exam.userResult.correctAnswers / exam.userResult.totalQuestions) * 100).toFixed(1)
                                            : '0.0'}%
                                    </Typography>
                                </Box>
                            ) : (isAuthenticated && (!questions || questions.length === 0)) ? (
                                <Alert severity="warning" sx={{ mb: 3 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        This exam has no questions available yet.
                                    </Typography>
                                </Alert>
                            ) : (
                                <Alert severity="info" sx={{ mb: 3 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                                        Instructions:
                                    </Typography>
                                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                                        <li>Once you start the exam, the timer will begin automatically</li>
                                        <li>You can navigate between questions using the question navigator</li>
                                        <li>Select your answers for all questions - they will be saved locally</li>
                                        <li>All answers will be submitted together when you click &quot;Submit Exam&quot;</li>
                                        <li>The exam will auto-submit when time runs out</li>
                                    </ul>
                                </Alert>
                            )}

                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    startIcon={<ArrowBack />}
                                    onClick={() => router.push(examsPath)}
                                >
                                    Back to Exams
                                </Button>
                                {!exam.hasUserAttempted && (
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={handleStartExam}
                                        disabled={isAuthenticated && (isQuestionsLoading || !questions || questions.length === 0)}
                                        sx={{ px: 4 }}
                                    >
                                        {isQuestionsLoading ? 'Loading...' : 'Start Exam'}
                                    </Button>
                                )}
                            </Box>
                        </Paper>
                    </Container>
                </Box>
            </>
        );
    }

    return (
        <>
            <Box
                sx={{
                    minHeight: '100vh',
                    backgroundColor: 'background.default',
                    pt: 10,
                    pb: 4,
                }}
            >
                <Container maxWidth="lg">
                    {/* Exam Header */}
                    <Paper sx={{ p: 3, mb: 3, position: 'sticky', top: 80, zIndex: 10 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                            <Box>
                                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                                    {exam.name}
                                </Typography>
                                <Stack direction="row" spacing={2}>
                                    <Chip
                                        icon={<Assessment />}
                                        label={`Question ${currentQuestionIndex + 1} of ${questions?.length || 0}`}
                                        color="primary"
                                    />
                                    <Chip
                                        icon={<CheckCircle />}
                                        label={`Answered: ${answeredCount}/${questions?.length || 0}`}
                                        color="secondary"
                                    />
                                </Stack>
                            </Box>
                            <Box sx={{ textAlign: 'right' }}>
                                <Chip
                                    icon={<Timer />}
                                    label={formatTime(timeRemaining)}
                                    color={getTimeColor()}
                                    sx={{ fontSize: '1.1rem', py: 3, px: 1 }}
                                />
                            </Box>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{ mt: 2, height: 8, borderRadius: 4 }}
                        />
                    </Paper>

                    {/* Question Card */}
                    {currentQuestion && (
                        <Card sx={{ mb: 3 }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                                    Question {currentQuestionIndex + 1}
                                </Typography>
                                <Divider sx={{ mb: 3 }} />

                                <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.8 }}>
                                    <LatexRenderer content={currentQuestion.content} />
                                </Typography>

                                {currentQuestion.image && (
                                    <Box sx={{ mb: 3, position: 'relative', width: '100%', height: 300 }}>
                                        <Image
                                            src={currentQuestion.image}
                                            alt="Question image"
                                            fill
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </Box>
                                )}

                                <RadioGroup
                                    value={selectedAnswers[currentQuestion.id] || ''}
                                    onChange={(e) => handleAnswerSelect(Number(e.target.value))}
                                >
                                    <Stack spacing={2}>
                                        {currentQuestion.choices.map((choice, index) => (
                                            <Paper
                                                key={choice.id}
                                                sx={{
                                                    p: 2,
                                                    border: '2px solid',
                                                    borderColor:
                                                        selectedAnswers[currentQuestion.id] === choice.id
                                                            ? 'primary.main'
                                                            : 'divider',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s ease',
                                                    '&:hover': {
                                                        borderColor: 'primary.light',
                                                        backgroundColor: 'action.hover',
                                                    },
                                                }}
                                                onClick={() => handleAnswerSelect(choice.id)}
                                            >
                                                <FormControlLabel
                                                    value={choice.id}
                                                    control={<Radio />}
                                                    label={
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                                                            <Chip
                                                                label={String.fromCharCode(65 + index)}
                                                                size="small"
                                                                color={
                                                                    selectedAnswers[currentQuestion.id] === choice.id
                                                                        ? 'primary'
                                                                        : 'default'
                                                                }
                                                            />
                                                            <Typography variant="body1">
                                                                <LatexRenderer content={choice.content} />
                                                            </Typography>
                                                        </Box>
                                                    }
                                                    sx={{ width: '100%', m: 0 }}
                                                />
                                            </Paper>
                                        ))}
                                    </Stack>
                                </RadioGroup>

                                {currentQuestion.explanation && currentQuestion.hasUserAnswered && (
                                    <Alert severity="info" sx={{ mt: 3 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                            Explanation:
                                        </Typography>
                                        <Typography variant="body2">
                                            <LatexRenderer content={currentQuestion.explanation} />
                                        </Typography>
                                    </Alert>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Navigation Buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                        <Button
                            variant="outlined"
                            size="large"
                            startIcon={<ArrowBack />}
                            onClick={handlePrevious}
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </Button>
                        <Button
                            variant={currentQuestion && flaggedQuestionIds.includes(currentQuestion.id) ? 'contained' : 'outlined'}
                            size="large"
                            color="error"
                            startIcon={<Flag />}
                            onClick={toggleFlag}
                            disabled={!currentQuestion}
                        >
                            {currentQuestion && flaggedQuestionIds.includes(currentQuestion.id) ? 'Flagged' : 'Flag'}
                        </Button>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {currentQuestionIndex === (unansweredQuestions?.length || 0) - 1 ? (
                                <Button
                                    variant="contained"
                                    size="large"
                                    color="success"
                                    startIcon={<Send />}
                                    onClick={() => setIsSubmitDialogOpen(true)}
                                >
                                    Submit Exam
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={handleNext}
                                >
                                    Next
                                </Button>
                            )}
                        </Box>
                    </Box>

                    {/* Question Navigator */}
                    <Paper sx={{ p: 3, mt: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                            Question Navigator
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {unansweredQuestions?.map((question, index) => {
                                const isFlagged = flaggedQuestionIds.includes(question.id);
                                const isAnswered = Boolean(selectedAnswers[question.id]);
                                const isCurrent = currentQuestionIndex === index;
                                return (
                                <Button
                                    key={question.id}
                                    variant={isCurrent || isFlagged ? 'contained' : 'outlined'}
                                    size="small"
                                    onClick={() => setCurrentQuestionIndex(index)}
                                    sx={{
                                        minWidth: 45,
                                        height: 45,
                                        borderRadius: 2,
                                        backgroundColor: isFlagged
                                            ? 'error.main'
                                            : isAnswered
                                                ? isCurrent
                                                    ? 'primary.main'
                                                    : 'success.light'
                                                : undefined,
                                        color: isFlagged
                                            ? 'error.contrastText'
                                            : isAnswered && !isCurrent
                                                ? 'success.dark'
                                                : undefined,
                                        borderColor: isFlagged
                                            ? 'error.main'
                                            : isAnswered
                                                ? 'success.main'
                                                : undefined,
                                        '&:hover': isFlagged
                                            ? { backgroundColor: 'error.dark' }
                                            : undefined,
                                    }}
                                >
                                    {isFlagged ? (
                                        index + 1
                                    ) : isAnswered ? (
                                        <CheckCircle sx={{ fontSize: 20 }} />
                                    ) : (
                                        index + 1
                                    )}
                                </Button>
                                );
                            })}
                        </Box>
                    </Paper>
                </Container>
            </Box>

            {/* Submit Confirmation Dialog */}
            <Dialog open={isSubmitDialogOpen} onClose={() => setIsSubmitDialogOpen(false)}>
                <DialogTitle>Submit Exam?</DialogTitle>
                <DialogContent>
                    <Typography>
                        You have answered {answeredCount} out of {questions?.length || 0} questions.
                    </Typography>
                    {answeredCount < (unansweredQuestions?.length || 0) && (
                        <Alert severity="warning" sx={{ mt: 2 }}>
                            You have not answered all questions. Unanswered questions will be marked as incorrect.
                        </Alert>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setIsSubmitDialogOpen(false)}
                        disabled={bulkSubmitAnswersMutation.isPending || submitExamMutation.isPending}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmitExam}
                        variant="contained"
                        color="success"
                        disabled={bulkSubmitAnswersMutation.isPending || submitExamMutation.isPending}
                    >
                        {bulkSubmitAnswersMutation.isPending
                            ? 'Submitting Answers...'
                            : submitExamMutation.isPending
                                ? 'Finalizing...'
                                : 'Submit'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}


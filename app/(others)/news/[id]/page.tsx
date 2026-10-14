'use client';

import React from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    Chip,
    Stack,
    CircularProgress,
    Alert,
    Button,
    Divider,
} from '@mui/material';
import {
    CalendarToday,
    Category,
    ArrowBack,
} from '@mui/icons-material';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useNewsItem } from '@/lib/api/hooks';

export default function NewsDetailPage() {
    const params = useParams();
    const router = useRouter();
    const newsId = Number(params.id);

    const { data: news, isLoading, error } = useNewsItem(newsId);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
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
                <Container maxWidth="md">
                    {/* Back Button */}
                    <Button
                        component={Link}
                        href="/news"
                        startIcon={<ArrowBack />}
                        sx={{ mb: 4 }}
                    >
                        Back to News
                    </Button>

                    {/* Loading State */}
                    {isLoading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {/* Error State */}
                    {error && (
                        <Alert severity="error" sx={{ mb: 4 }}>
                            Failed to load news article. Please try again later.
                        </Alert>
                    )}

                    {/* News Content */}
                    {!isLoading && !error && news && (
                        <Card sx={{ overflow: 'hidden' }}>
                            {/* Cover Image */}
                            {news.coverImage && (
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: { xs: 300, md: 400 },
                                        position: 'relative',
                                        background: `url(${news.coverImage})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                />
                            )}

                            <Box sx={{ p: { xs: 3, md: 5 } }}>
                                {/* Category and Date */}
                                <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
                                    <Chip
                                        icon={<Category />}
                                        label={news.category}
                                        color="primary"
                                        sx={{ fontWeight: 600 }}
                                    />
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {formatDate(news.createdAt)}
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Divider sx={{ mb: 3 }} />

                                {/* Title */}
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 3,
                                        fontSize: { xs: '2rem', md: '2.5rem' },
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {news.title}
                                </Typography>

                                {/* Content */}
                                <Typography
                                    variant="body1"
                                    sx={{
                                        lineHeight: 1.8,
                                        fontSize: '1.1rem',
                                        whiteSpace: 'pre-wrap',
                                        color: 'text.primary',
                                    }}
                                >
                                    {news.content}
                                </Typography>
                            </Box>
                        </Card>
                    )}

                    {/* Related Actions */}
                    {!isLoading && !error && news && (
                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <Button
                                component={Link}
                                href="/news"
                                variant="outlined"
                                size="large"
                                startIcon={<ArrowBack />}
                                sx={{ px: 4 }}
                            >
                                View All News
                            </Button>
                        </Box>
                    )}
                </Container>
            </Box>
        </>
    );
}


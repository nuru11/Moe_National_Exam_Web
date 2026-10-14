'use client';

import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Button,
    Chip,
    TextField,
    InputAdornment,
    MenuItem,
    Alert,
    Stack,
    Skeleton,
} from '@mui/material';
import {
    Search,
    Article,
    CalendarToday,
    Category,
    ArrowForward,
} from '@mui/icons-material';
import Link from 'next/link';
import { useNews } from '@/lib/api/hooks';

export default function NewsPage() {
    const { data: news, isLoading, error } = useNews();

    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState<string>('all');

    // Get unique categories
    const categories = news ? ['all', ...Array.from(new Set(news.map(n => n.category)))] : ['all'];

    // Filter news
    const filteredNews = news?.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
        return matchesSearch && matchesCategory;
    }) || [];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
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
                <Container maxWidth="xl">
                    {/* Header Section */}
                    <Box sx={{ mb: 6 }}>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                            }}
                        >
                            News & Updates
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            Stay informed with the latest news, updates, and announcements
                        </Typography>

                        {/* Filters */}
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 8 }}>
                                <TextField
                                    fullWidth
                                    placeholder="Search news..."
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
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Category"
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category} value={category}>
                                            {category === 'all' ? 'All Categories' : category}
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
                            Failed to load news. Please try again later.
                        </Alert>
                    )}

                    {/* News Grid */}
                    {!isLoading && !error && (
                        <>
                            {filteredNews.length === 0 ? (
                                <Box
                                    sx={{
                                        textAlign: 'center',
                                        py: 8,
                                    }}
                                >
                                    <Article sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
                                    <Typography variant="h6" color="text.secondary">
                                        No news found
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Try adjusting your search or filters
                                    </Typography>
                                </Box>
                            ) : (
                                <Grid container spacing={3}>
                                    {filteredNews.map((item) => (
                                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                                            <Card
                                                sx={{
                                                    height: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'translateY(-8px)',
                                                        boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                                                    },
                                                }}
                                            >
                                                <CardMedia
                                                    component="div"
                                                    sx={{
                                                        height: 200,
                                                        background: item.coverImage
                                                            ? `url(${item.coverImage})`
                                                            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                        position: 'relative',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {!item.coverImage && (
                                                        <Article sx={{ fontSize: 80, color: 'white', opacity: 0.5 }} />
                                                    )}
                                                </CardMedia>
                                                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                                                        <Chip
                                                            label={item.category}
                                                            size="small"
                                                            color="primary"
                                                            sx={{ fontWeight: 600 }}
                                                        />
                                                    </Stack>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontWeight: 600,
                                                            mb: 1.5,
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                        }}
                                                    >
                                                        {item.title}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{
                                                            mb: 2,
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 3,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                        }}
                                                    >
                                                        {item.content}
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto' }}>
                                                        <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                        <Typography variant="caption" color="text.secondary">
                                                            {formatDate(item.createdAt)}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                                <CardActions sx={{ p: 3, pt: 0 }}>
                                                    <Button
                                                        fullWidth
                                                        variant="contained"
                                                        size="large"
                                                        component={Link}
                                                        href={`/news/${item.id}`}
                                                        endIcon={<ArrowForward />}
                                                        sx={{
                                                            py: 1.2,
                                                        }}
                                                    >
                                                        Read More
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </>
                    )}

                    {/* Stats Section */}
                    {!isLoading && !error && news && news.length > 0 && (
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
                                            {news.length}
                                        </Typography>
                                        <Typography variant="body1">Total Articles</Typography>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                                            {categories.length - 1}
                                        </Typography>
                                        <Typography variant="body1">Categories</Typography>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                                            {new Date().getFullYear()}
                                        </Typography>
                                        <Typography variant="body1">Current Year</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </Container>
            </Box>
        </>
    );
}


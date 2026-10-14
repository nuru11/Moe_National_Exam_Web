'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Chip,
  Stack,
} from '@mui/material';
import {
  School,
  EmojiEvents,
  Assessment,
  TrendingUp,
  Groups,
  Timer,
  CheckCircle,
  ArrowForward,
  Star,
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import { useEntranceTricksStatus, useTestimonials } from '@/lib/api/hooks';

export default function Home() {

  const { data: entranceTricksStatus } = useEntranceTricksStatus();
  const { data: testimonials } = useTestimonials();
  const features = [
    {
      icon: <Assessment sx={{ fontSize: 40 }} />,
      title: 'Practice Exams',
      description: 'Access hundreds of practice exams tailored to your curriculum and learning needs.',
      color: '#6366f1',
    },
    {
      icon: <EmojiEvents sx={{ fontSize: 40 }} />,
      title: 'Leaderboards',
      description: 'Compete with peers and track your performance on global and exam-specific leaderboards.',
      color: '#ec4899',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      title: 'Progress Tracking',
      description: 'Monitor your improvement over time with detailed analytics and insights.',
      color: '#10b981',
    },
    {
      icon: <Groups sx={{ fontSize: 40 }} />,
      title: 'Community',
      description: 'Join thousands of students preparing for their entrance exams together.',
      color: '#f59e0b',
    },
    {
      icon: <Timer sx={{ fontSize: 40 }} />,
      title: 'Timed Practice',
      description: 'Practice under real exam conditions with timed tests and instant feedback.',
      color: '#3b82f6',
    },
    {
      icon: <CheckCircle sx={{ fontSize: 40 }} />,
      title: 'Instant Results',
      description: 'Get immediate feedback on your answers with detailed explanations.',
      color: '#8b5cf6',
    },
  ];

  const stats = [
    { value: entranceTricksStatus?.totalStudents.toString() || '0', label: 'Active Students' },
    { value: entranceTricksStatus?.practiceExams.toString() || '0', label: 'Practice Exams' },
    { value: entranceTricksStatus?.questions.toString() || '0', label: 'Questions' },
  ];


  return (
    <>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          pt: { xs: 12, md: 16 },
          pb: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
            <Box sx={{ flex: 1 }}>
              <Chip
                label="🎓 Your Path to Success"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  mb: 3,
                  backdropFilter: 'blur(10px)',
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 800,
                  mb: 3,
                  lineHeight: 1.2,
                }}
              >
                Master Your Entrance Exams
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.95,
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  fontWeight: 400,
                }}
              >
                Practice with real exam questions, compete on leaderboards, and track your progress.
                Join thousands of students achieving their dreams.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  component={Link}
                  href="/exams"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    backgroundColor: 'white',
                    color: 'primary.main',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Start Practicing
                </Button>
                <Button
                  component={Link}
                  href="/leaderboard"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  View Leaderboard
                </Button>
              </Stack>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  height: { xs: 220, md: 360 },
                  background: 'white',
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: { xs: 2, md: 4 },
                }}
              >
                <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Image
                    src="/logos/education_assessment_examinations_service_logo.jpg"
                    alt="Educational Assessment and Examinations Service"
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 6, backgroundColor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'space-around' }}>
            {stats.map((stat, index) => (
              <Box key={index} sx={{ flex: { xs: '1 1 45%', md: '1 1 20%' }, minWidth: 150, textAlign: 'center' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    color: 'primary.main',
                    mb: 1,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Everything You Need to Succeed
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Comprehensive tools and resources designed to help you achieve your best performance
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
            {features.map((feature, index) => (
              <Box key={index} sx={{ flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 30%' }, maxWidth: { md: 350 } }}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: 3,
                        backgroundColor: `${feature.color}15`,
                        color: feature.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              What Students Say
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Join thousands of successful students
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
            {testimonials?.map((testimonial, index) => (
              <Box key={index} sx={{ flex: { xs: '1 1 100%', md: '1 1 30%' }, maxWidth: { md: 350 } }}>
                <Card
                  sx={{
                    height: '100%',
                    p: 2,
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} sx={{ color: '#fbbf24', fontSize: 20 }} />
                      ))}
                    </Box>
                    <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic', lineHeight: 1.8 }}>
                      &quot;{testimonial.testimonial}&quot;
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 50, height: 50, bgcolor: 'primary.main' }}>
                        {testimonial.name[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {testimonial.title}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Ready to Start Your Journey?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.95 }}>
              Join thousands of students who are already improving their scores
            </Typography>
            <Button
              component={Link}
              href="/signIn"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: 'white',
                color: 'primary.main',
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Get Started Free
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: 4,
          backgroundColor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <School sx={{ fontSize: 28, mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Entrance Tricks
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 2 }}>
              <Button
                component={Link}
                href="/privacy-policy"
                sx={{ textTransform: 'none', color: 'text.secondary', minWidth: 'auto' }}
              >
                Privacy Policy
              </Button>
              <Button
                component={Link}
                href="/tos"
                sx={{ textTransform: 'none', color: 'text.secondary', minWidth: 'auto' }}
              >
                Terms of Service
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary">
              © 2025 Entrance Tricks. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}

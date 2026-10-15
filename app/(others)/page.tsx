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
  CircularProgress,
} from '@mui/material';
import {
  EmojiEvents,
  Assessment,
  TrendingUp,
  Groups,
  Timer,
  CheckCircle,
  Star,
  ArrowForward,
} from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEntranceTricksStatus, useGrades, useTestimonials } from '@/lib/api/hooks';
import { WEB_GRADE_APPS } from '@/lib/config/app';
import { useSelectedApp } from '@/components/SelectedAppProvider';
import AppProgramCard from '@/components/AppProgramCard';

export default function Home() {

  const router = useRouter();
  const { selectedPackage, setSelectedPackage } = useSelectedApp();
  const { data: entranceTricksStatus } = useEntranceTricksStatus();
  const { data: testimonials } = useTestimonials();
  const { data: grades, isLoading: gradesLoading } = useGrades();
  const gradesForApp = grades?.filter((grade) => grade.appPackage === selectedPackage) ?? [];
  const selectedApp = WEB_GRADE_APPS.find((app) => app.package === selectedPackage);
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
         
         
         
          {selectedApp && (
            <Box
              sx={{
                mb: 3,
                p: { xs: 2.5, md: 3 },
                borderRadius: 3,
                backgroundColor: '#ffffff',
                color: 'text.primary',
                boxShadow: '0 16px 40px rgba(15, 23, 42, 0.18)',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                Choose a {selectedApp.label} grade
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Select your grade to open the matching exams.
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
                      onClick={() => router.push(`/exams?grade=${grade.id}`)}
                    >
                      {grade.name}
                    </Button>
                  ))}
                </Box>
              )}
            </Box>
          )}
          <Typography variant="overline" sx={{ display: 'block', mb: 2, letterSpacing: '0.08em', opacity: 0.9 }}>
            Select a program
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

    </>
  );
}

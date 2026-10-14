'use client';

import React, { Component, ReactNode } from 'react';
import { Box, Typography, Button, Container, Card, CardContent } from '@mui/material';
import { Error as ErrorIcon, Refresh } from '@mui/icons-material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.default',
            p: 2,
          }}
        >
          <Container maxWidth="sm">
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 6 }}>
                <ErrorIcon sx={{ fontSize: 80, color: 'error.main', mb: 3 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                  Oops! Something went wrong
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  We&apos;re sorry for the inconvenience. Please try refreshing the page.
                </Typography>
                {this.state.error && process.env.NODE_ENV === 'development' && (
                  <Box
                    sx={{
                      textAlign: 'left',
                      backgroundColor: 'grey.100',
                      p: 2,
                      borderRadius: 1,
                      mb: 3,
                      maxHeight: 200,
                      overflow: 'auto',
                    }}
                  >
                    <Typography variant="caption" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                      {this.state.error.toString()}
                    </Typography>
                  </Box>
                )}
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Refresh />}
                  onClick={this.handleReset}
                >
                  Refresh Page
                </Button>
              </CardContent>
            </Card>
          </Container>
        </Box>
      );
    }

    return this.props.children;
  }
}


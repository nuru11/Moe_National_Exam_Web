import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { School } from '@mui/icons-material';
import Link from 'next/link';
import DownloadLinks from '@/components/DownloadLinks';

export default function Footer() {
    return (
        <Box
            component="footer"
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
                            MOE National Exam
                        </Typography>
                    </Box>
                    <DownloadLinks stores={false} />
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
                        © 2025 MOE National Exam. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

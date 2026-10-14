'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Box,
  useScrollTrigger,
} from '@mui/material';
import {
  Menu as MenuIcon,
  EmojiEvents,
  Assessment,
  Article,
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const router = useRouter();
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const menuItems = [
    { label: 'Exams', path: '/exams', icon: <Assessment /> },
    { label: 'Leaderboard', path: '/leaderboard', icon: <EmojiEvents /> },
    { label: 'News', path: '/news', icon: <Article /> },
  ];

  const isTransparent = transparent && !trigger;

  return (
    <AppBar
      position="fixed"
      elevation={isTransparent ? 0 : 1}
      sx={{
        backgroundColor: isTransparent ? 'transparent' : 'background.paper',
        backdropFilter: isTransparent ? 'none' : 'blur(10px)',
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                position: 'relative',
                mr: 1,
                flexShrink: 0,
              }}
            >
              <Image
                src="/logos/ministry_of_education_logo.jpg"
                alt="Ministry of Education"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: isTransparent ? 'white' : 'text.primary',
                display: { xs: 'none', sm: 'block' },
                transition: 'color 0.3s ease',
              }}
            >
              Entrance Tricks
            </Typography>
          </Link>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            {menuItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                href={item.path}
                startIcon={item.icon}
                sx={{
                  color: isTransparent ? 'white' : 'text.primary',
                  '&:hover': {
                    backgroundColor: isTransparent ? 'rgba(255,255,255,0.1)' : 'action.hover',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}

            <Button
              component={Link}
              href="/signIn"
              variant="contained"
              sx={{
                ml: 2,
                backgroundColor: isTransparent ? 'white' : 'primary.main',
                color: isTransparent ? 'primary.main' : 'white',
                '&:hover': {
                  backgroundColor: isTransparent ? 'rgba(255,255,255,0.9)' : 'primary.dark',
                },
              }}
            >
              Sign In
            </Button>
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={handleMobileMenuOpen}
              sx={{
                color: isTransparent ? 'white' : 'text.primary',
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleMobileMenuClose}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item.path}
                  onClick={() => {
                    handleMobileMenuClose();
                    router.push(item.path);
                  }}
                >
                  {item.icon}
                  <Typography sx={{ ml: 2 }}>{item.label}</Typography>
                </MenuItem>
              ))}
              <MenuItem
                onClick={() => {
                  handleMobileMenuClose();
                  router.push('/signIn');
                }}
              >
                Sign In
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}


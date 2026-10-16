'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Box,
} from '@mui/material';
import {
  Menu as MenuIcon,
  EmojiEvents,
  Assessment,
  Person,
  Logout,
  Article,
  Score,
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import DownloadLinks, { DownloadMenuItems } from '@/components/DownloadLinks';

export default function AuthenticatedHeader() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    router.push('/');
  };

  const menuItems = [
    { label: 'Exams', path: '/exams', icon: <Assessment /> },
    { label: 'Scores', path: '/scores', icon: <Score /> },
    { label: 'Leaderboard', path: '/leaderboard', icon: <EmojiEvents /> },
    { label: 'News', path: '/news', icon: <Article /> },
  ];

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        backgroundColor: 'background.paper',
        backdropFilter: 'blur(10px)',
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
                color: 'text.primary',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              MOE National Exam
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
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}

            <DownloadLinks compact />

            {user && (
              <Box sx={{ ml: 2 }}>
                <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
                  <Avatar
                    alt={user.firstName}
                    src={user.profilePic && user.profilePic.trim() !== '' ? user.profilePic : undefined}
                    sx={{
                      width: 40,
                      height: 40,
                      border: '2px solid',
                      borderColor: 'primary.main',
                      bgcolor: !user.profilePic || user.profilePic.trim() === '' ? 'primary.main' : undefined,
                      color: !user.profilePic || user.profilePic.trim() === '' ? 'white' : undefined,
                      fontWeight: 600,
                    }}
                  >
                    {user.firstName?.[0]?.toUpperCase() || 'U'}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem disabled>
                    <Box>
                      <Typography variant="subtitle2">
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      router.push('/profile');
                    }}
                  >
                    <Person sx={{ mr: 1 }} /> Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Logout sx={{ mr: 1 }} /> Logout
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
            <DownloadLinks compact />
            {user && (
              <Avatar
                alt={user.firstName}
                src={user.profilePic && user.profilePic.trim() !== '' ? user.profilePic : undefined}
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: !user.profilePic || user.profilePic.trim() === '' ? 'primary.main' : undefined,
                  color: !user.profilePic || user.profilePic.trim() === '' ? 'white' : undefined,
                  fontWeight: 600,
                  border: '2px solid',
                  borderColor: 'primary.main',
                }}
              >
                {user.firstName?.[0]?.toUpperCase() || 'U'}
              </Avatar>
            )}
            <IconButton
              onClick={handleMobileMenuOpen}
              sx={{
                color: 'text.primary',
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
                  router.push('/profile');
                }}
              >
                <Person sx={{ mr: 2 }} /> Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Logout sx={{ mr: 2 }} /> Logout
              </MenuItem>
              <DownloadMenuItems onNavigate={handleMobileMenuClose} />
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}


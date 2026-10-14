'use client';

import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Avatar,
    Button,
    TextField,
    Grid,
    Stack,
    Chip,
    Divider,
    CircularProgress,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    InputAdornment,
} from '@mui/material';
import {
    Person,
    Email,
    Grade as GradeIcon,
    Edit,
    Save,
    Cancel,
    EmojiEvents,
    Assessment,
    TrendingUp,
    DeleteForever,
    Warning,
    PhotoCamera,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';
import { useUpdateProfile, useDeleteAccount, useGrades, useUserStats } from '@/lib/api/hooks';
import gradeMenuItems from '@/components/GradeMenuItems';

export default function ProfilePage() {
    const router = useRouter();
    const { user, updateUser } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        gradeId: user?.grade?.id || 1,
    });
    const [error, setError] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteError, setDeleteError] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const updateProfileMutation = useUpdateProfile();
    const deleteAccountMutation = useDeleteAccount();
    const { data: grades } = useGrades();

    // User is guaranteed to be authenticated by the parent layout
    if (!user) {
        return null;
    }

    const handleEdit = () => {
        setIsEditing(true);
        setEditData({
            firstName: user.firstName,
            lastName: user.lastName || '',
            gradeId: user.grade.id,
        });
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setError('');
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Please select an image file');
                return;
            }
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size should be less than 5MB');
                return;
            }
            setSelectedFile(file);
            setError('');
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        setError('');
        if (!editData.firstName.trim()) {
            setError('First name is required');
            return;
        }

        try {
            // If a file is selected, use FormData; otherwise use regular JSON
            if (selectedFile) {
                const formData = new FormData();
                formData.append('profile_pic', selectedFile);
                formData.append('first_name', editData.firstName);
                if (editData.lastName) {
                    formData.append('last_name', editData.lastName);
                }
                formData.append('grade_id', editData.gradeId.toString());
                
                await updateProfileMutation.mutateAsync(formData);
            } else {
                await updateProfileMutation.mutateAsync({
                    first_name: editData.firstName,
                    last_name: editData.lastName || null,
                    grade_id: editData.gradeId,
                });
            }
            setIsEditing(false);
            setSelectedFile(null);
            setPreviewUrl(null);
        } catch (err: unknown) {
            const errorMessage = err && typeof err === 'object' && 'message' in err
                ? String(err.message)
                : 'Failed to update profile. Please try again.';
            setError(errorMessage);
        }
    };

    const handleDeleteAccount = async () => {
        setDeleteError('');
        try {
            await deleteAccountMutation.mutateAsync();
            router.push('/');
        } catch (err: unknown) {
            const errorMessage = err && typeof err === 'object' && 'message' in err
                ? String(err.message)
                : 'Failed to delete account. Please try again.';
            setDeleteError(errorMessage);
        }
    };

    const openDeleteDialog = () => {
        setDeleteDialogOpen(true);
        setDeleteError('');
    };

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setDeleteError('');
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
                    {/* Profile Header */}
                    <Card
                        sx={{
                            mb: 4,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                        }}
                    >
                        <CardContent sx={{ p: 4 }}>
                            <Grid container spacing={4} alignItems="center">
                                <Grid size={{ xs: 12, md: 'auto' }}>
                                    <Box sx={{ position: 'relative', display: 'inline-block' }}>
                                        <Avatar
                                            src={previewUrl || user.profilePic || undefined}
                                            sx={{
                                                width: 120,
                                                height: 120,
                                                border: '4px solid white',
                                                fontSize: '3rem',
                                            }}
                                        >
                                            {user.firstName[0].toUpperCase()}
                                        </Avatar>
                                        {isEditing && (
                                            <Box
                                                component="label"
                                                htmlFor="profile-pic-upload"
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    right: 0,
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    width: 40,
                                                    height: 40,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                    border: '2px solid',
                                                    borderColor: 'primary.main',
                                                    '&:hover': {
                                                        backgroundColor: 'grey.100',
                                                    },
                                                }}
                                            >
                                                <PhotoCamera sx={{ color: 'primary.main', fontSize: 24 }} />
                                                <input
                                                    id="profile-pic-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    style={{ display: 'none' }}
                                                    onChange={handleFileSelect}
                                                />
                                            </Box>
                                        )}
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, md: 'auto' }}>
                                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                                        {user.firstName} {user.lastName}
                                    </Typography>
                                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                                        <Chip
                                            label={user.grade.name}
                                            sx={{
                                                backgroundColor: 'rgba(255,255,255,0.2)',
                                                color: 'white',
                                                fontWeight: 600,
                                            }}
                                        />
                                        {user.isPhoneVerified && (
                                            <Chip
                                                label="Verified"
                                                sx={{
                                                    backgroundColor: 'rgba(76, 175, 80, 0.3)',
                                                    color: 'white',
                                                    fontWeight: 600,
                                                }}
                                            />
                                        )}
                                    </Stack>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.9 }}>
                                        <Email sx={{ fontSize: 20 }} />
                                        <Typography variant="body1">{user.email}</Typography>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, md: 'auto' }}>
                                    {!isEditing && (
                                        <Button
                                            variant="contained"
                                            startIcon={<Edit />}
                                            onClick={handleEdit}
                                            sx={{
                                                backgroundColor: 'white',
                                                color: 'primary.main',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255,255,255,0.9)',
                                                },
                                            }}
                                        >
                                            Edit Profile
                                        </Button>
                                    )}
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

        

                    {/* Profile Details */}
                    <Card>
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                    Profile Information
                                </Typography>
                            </Box>

                            <Divider sx={{ mb: 3 }} />

                            {error && (
                                <Alert severity="error" sx={{ mb: 3 }}>
                                    {error}
                                </Alert>
                            )}

                            {isEditing ? (
                                <Box>
                                    {selectedFile && (
                                        <Alert severity="info" sx={{ mb: 3 }}>
                                            New profile picture selected: {selectedFile.name}
                                        </Alert>
                                    )}
                                    <Grid container spacing={3}>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="First Name"
                                                value={editData.firstName}
                                                onChange={(e) =>
                                                    setEditData({ ...editData, firstName: e.target.value })
                                                }
                                                InputProps={{
                                                    startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />,
                                                }}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="Last Name"
                                                value={editData.lastName}
                                                onChange={(e) =>
                                                    setEditData({ ...editData, lastName: e.target.value })
                                                }
                                                InputProps={{
                                                    startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />,
                                                }}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField
                                                fullWidth
                                                select
                                                label="Grade"
                                                value={editData.gradeId}
                                                onChange={(e) =>
                                                    setEditData({ ...editData, gradeId: Number(e.target.value) })
                                                }
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <GradeIcon sx={{ color: 'text.secondary' }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            >
                                                {gradeMenuItems(grades)}
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                                        <Button
                                            variant="contained"
                                            startIcon={<Save />}
                                            onClick={handleSave}
                                            disabled={updateProfileMutation.isPending}
                                        >
                                            {updateProfileMutation.isPending ? (
                                                <CircularProgress size={24} color="inherit" />
                                            ) : (
                                                'Save Changes'
                                            )}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            startIcon={<Cancel />}
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </Button>
                                    </Stack>
                                </Box>
                            ) : (
                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <Person sx={{ fontSize: 18 }} /> First Name
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                {user.firstName}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <Person sx={{ fontSize: 18 }} /> Last Name
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                {user.lastName || 'Not set'}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <Email sx={{ fontSize: 18 }} /> Email
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                {user.email}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <GradeIcon sx={{ fontSize: 18 }} /> Grade
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                {user.grade.name}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            )}
                        </CardContent>
                    </Card>

                    {/* Account Info */}
                    <Card sx={{ mt: 3 }}>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                                Account Information
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                                        Member Since
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                                        Last Updated
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        {new Date(user.updatedAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    {/* Danger Zone */}
                    <Card
                        sx={{
                            mt: 3,
                            border: '2px solid',
                            borderColor: 'error.main',
                            backgroundColor: 'rgba(211, 47, 47, 0.05)',
                        }}
                    >
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <Warning sx={{ color: 'error.main', fontSize: 28 }} />
                                <Typography variant="h5" sx={{ fontWeight: 700, color: 'error.main' }}>
                                    Danger Zone
                                </Typography>
                            </Box>
                            <Divider sx={{ mb: 3, borderColor: 'error.main' }} />
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                        Delete Account
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 600 }}>
                                        Once you delete your account, there is no going back. All your data, including exam history,
                                        progress, and achievements will be permanently deleted within 30 days.
                                    </Typography>
                                </Box>
                                <Button
                                    variant="contained"
                                    color="error"
                                    startIcon={<DeleteForever />}
                                    onClick={openDeleteDialog}
                                    sx={{
                                        minWidth: { xs: '100%', sm: 'auto' },
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    Delete Account
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Container>
            </Box>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={closeDeleteDialog}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Warning sx={{ color: 'error.main', fontSize: 32 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Delete Account?
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>
                        Are you absolutely sure you want to delete your account? This action <strong>cannot be undone</strong>.
                    </DialogContentText>
                    <Box
                        sx={{
                            backgroundColor: 'error.light',
                            borderRadius: 2,
                            p: 2,
                            mb: 2,
                        }}
                    >
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'error.dark' }}>
                            This will permanently delete:
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, m: 0 }}>
                            <li>
                                <Typography variant="body2" sx={{ color: 'error.dark' }}>
                                    Your profile and account information
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body2" sx={{ color: 'error.dark' }}>
                                    All your exam results and progress
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body2" sx={{ color: 'error.dark' }}>
                                    Your leaderboard rankings and achievements
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body2" sx={{ color: 'error.dark' }}>
                                    Any downloaded study materials
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body2" sx={{ color: 'error.dark' }}>
                                    Your subscription and payment history
                                </Typography>
                            </li>
                        </Box>
                    </Box>
                    {deleteError && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {deleteError}
                        </Alert>
                    )}
                    <DialogContentText>
                        If you&apos;re sure you want to proceed, click the &quot;Delete My Account&quot; button below.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 0 }}>
                    <Button
                        onClick={closeDeleteDialog}
                        variant="outlined"
                        disabled={deleteAccountMutation.isPending}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteAccount}
                        variant="contained"
                        color="error"
                        startIcon={deleteAccountMutation.isPending ? <CircularProgress size={20} color="inherit" /> : <DeleteForever />}
                        disabled={deleteAccountMutation.isPending}
                    >
                        {deleteAccountMutation.isPending ? 'Deleting...' : 'Delete My Account'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}


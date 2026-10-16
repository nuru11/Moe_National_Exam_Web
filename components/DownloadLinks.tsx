'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, MenuItem, Typography } from '@mui/material';
import { useActiveStoreLinks } from '@/components/SelectedAppProvider';

const TELEGRAM_URL = 'https://t.me/entrance_tricks';

const linkProps = {
    target: '_blank',
    rel: 'noopener noreferrer',
} as const;

function TelegramIcon({ size = 22 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="currentColor"
                d="M9.04 15.3 8.9 19.1c.4 0 .58-.17.79-.38l1.9-1.82 3.94 2.89c.72.4 1.24.19 1.44-.67l2.61-12.3c.23-1.05-.38-1.46-1.08-1.2L3.3 10.05c-1.02.4-1.01.97-.17 1.23l4.56 1.42 10.59-6.68c.5-.3.95-.14.58.19L9.04 15.3Z"
            />
        </svg>
    );
}

function PlayStoreIcon({ size = 18 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#34A853" d="M3.5 20.5 13.2 12 3.5 3.5v17Z" />
            <path fill="#FBBC04" d="m13.2 12 2.7-2.4-9.1-5.2L3.5 3.5 13.2 12Z" />
            <path fill="#EA4335" d="m15.9 9.6 2.8 1.6c.8.46.8 1.22 0 1.68l-2.8 1.6L13.2 12l2.7-2.4Z" />
            <path fill="#4285F4" d="M3.5 20.5 6.8 18.6l9.1-5.2L13.2 12 3.5 20.5Z" />
        </svg>
    );
}

function AppStoreIcon({ size = 18 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="currentColor"
                d="M16.37 12.72c.02 2.2 1.93 2.93 1.95 2.94-.02.05-.3 1.04-1 2.06-.6.88-1.23 1.76-2.21 1.78-.97.02-1.28-.57-2.39-.57-1.1 0-1.45.55-2.37.59-.95.04-1.67-.95-2.28-1.83-1.24-1.8-2.19-5.08-.91-7.3.63-1.1 1.76-1.8 2.99-1.82.93-.02 1.81.63 2.39.63.57 0 1.64-.78 2.77-.66.47.02 1.8.19 2.65 1.44-.07.04-1.58.92-1.56 2.74ZM14.7 6.3c.5-.61.84-1.46.75-2.3-.72.03-1.6.48-2.12 1.09-.46.54-.87 1.4-.76 2.23.81.06 1.63-.41 2.13-1.02Z"
            />
        </svg>
    );
}

type StorePlatform = 'android' | 'ios' | 'desktop';

function useStorePlatform() {
    const [platform, setPlatform] = useState<StorePlatform | null>(null);

    useEffect(() => {
        const agent = navigator.userAgent;
        if (/android/i.test(agent)) {
            setPlatform('android');
        } else if (/iPhone|iPad|iPod/i.test(agent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
            setPlatform('ios');
        } else {
            setPlatform('desktop');
        }
    }, []);

    return platform;
}

function storesForPlatform(playStoreUrl: string, appStoreUrl: string, platform: StorePlatform | null) {
    if (platform === 'android') {
        return { playStoreUrl, appStoreUrl: '' };
    }
    if (platform === 'ios') {
        return { playStoreUrl: '', appStoreUrl };
    }
    if (platform === 'desktop') {
        return { playStoreUrl, appStoreUrl };
    }
    return { playStoreUrl: '', appStoreUrl: '' };
}

interface DownloadLinksProps {
    compact?: boolean;
    stores?: boolean;
}

export default function DownloadLinks({ compact = false, stores = true }: DownloadLinksProps) {
    const activeLinks = useActiveStoreLinks();
    const platform = useStorePlatform();
    const { playStoreUrl, appStoreUrl } = stores
        ? storesForPlatform(activeLinks.playStoreUrl, activeLinks.appStoreUrl, platform)
        : { playStoreUrl: '', appStoreUrl: '' };
    const buttonSx = {
        textTransform: 'none',
        borderColor: 'divider',
        color: 'text.primary',
        px: compact ? 1.25 : 1.75,
        py: compact ? 0.4 : 0.75,
        minWidth: 0,
        whiteSpace: 'nowrap',
        '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'action.hover',
        },
    } as const;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: compact ? 0.5 : 1.25, flexWrap: 'wrap' }}>
            <IconButton
                component="a"
                href={TELEGRAM_URL}
                {...linkProps}
                aria-label="Telegram"
                size={compact ? 'small' : 'medium'}
                sx={{ color: '#229ED9' }}
            >
                <TelegramIcon size={compact ? 22 : 26} />
            </IconButton>
            {playStoreUrl && (
                <Button
                    component="a"
                    href={playStoreUrl}
                    {...linkProps}
                    variant="outlined"
                    size={compact ? 'small' : 'medium'}
                    startIcon={<PlayStoreIcon />}
                    sx={buttonSx}
                >
                    Google Play
                </Button>
            )}
            {appStoreUrl && (
                <Button
                    component="a"
                    href={appStoreUrl}
                    {...linkProps}
                    variant="outlined"
                    size={compact ? 'small' : 'medium'}
                    startIcon={<AppStoreIcon />}
                    sx={buttonSx}
                >
                    App Store
                </Button>
            )}
        </Box>
    );
}

export function DownloadMenuItems({ onNavigate }: { onNavigate?: () => void }) {
    const activeLinks = useActiveStoreLinks();
    const platform = useStorePlatform();
    const { playStoreUrl, appStoreUrl } = storesForPlatform(
        activeLinks.playStoreUrl,
        activeLinks.appStoreUrl,
        platform,
    );
    const items = [
        { href: TELEGRAM_URL, label: 'Telegram', icon: <TelegramIcon size={20} /> },
        ...(playStoreUrl ? [{ href: playStoreUrl, label: 'Google Play', icon: <PlayStoreIcon /> }] : []),
        ...(appStoreUrl ? [{ href: appStoreUrl, label: 'App Store', icon: <AppStoreIcon /> }] : []),
    ];

    return (
        <>
            {items.map((item) => (
                <MenuItem
                    key={item.href}
                    component="a"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onNavigate}
                >
                    <Box sx={{ display: 'flex', color: item.label === 'Telegram' ? '#229ED9' : 'text.primary' }}>
                        {item.icon}
                    </Box>
                    <Typography sx={{ ml: 2 }}>{item.label}</Typography>
                </MenuItem>
            ))}
        </>
    );
}

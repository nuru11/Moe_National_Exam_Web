'use client';

import { Box, Typography } from '@mui/material';
import {
    School,
    MenuBook,
    AutoStories,
    EmojiEvents,
    AccountBalance,
    CheckCircle,
    ArrowForward,
} from '@mui/icons-material';
import { AppBoxStoreButtons } from '@/components/DownloadLinks';

const APP_CARD_DETAILS: Record<string, { description: string; Icon: typeof School }> = {
    'com.vector_academy.app': { description: 'University entrance', Icon: School },
    'com.freshman_tricks.app': { description: 'First-year courses', Icon: MenuBook },
    'com.remedial_tricks.app': { description: 'Remedial practice', Icon: AutoStories },
    'com.ethio_exit_exam.app': { description: 'Exit exam prep', Icon: EmojiEvents },
    'com.ministry_tricks.app': { description: 'Ministry exams', Icon: AccountBalance },
};

export default function AppProgramCard({
    appPackage,
    label,
    selected,
    onSelect,
}: {
    appPackage: string;
    label: string;
    selected: boolean;
    onSelect: () => void;
}) {
    const details = APP_CARD_DETAILS[appPackage];
    const Icon = details?.Icon ?? School;

    return (
        <Box
            aria-pressed={selected}
            onClick={onSelect}
            onKeyDown={(event) => {
                if (event.target !== event.currentTarget) return;
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onSelect();
                }
            }}
            tabIndex={0}
            sx={{
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                p: 2.5,
                minHeight: 176,
                borderRadius: 3,
                border: '2px solid',
                borderColor: selected ? 'primary.main' : 'divider',
                backgroundColor: 'background.paper',
                color: 'text.primary',
                font: 'inherit',
                boxShadow: selected
                    ? '0 12px 28px rgba(15, 23, 42, 0.12)'
                    : '0 4px 14px rgba(15, 23, 42, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.25,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 14px 30px rgba(15, 23, 42, 0.12)',
                },
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box
                    sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        backgroundColor: selected ? 'primary.main' : '#eef2ff',
                        color: selected ? '#ffffff' : 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Icon />
                </Box>
                {selected && <CheckCircle color="primary" />}
            </Box>
            <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                    {label}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {details?.description}
                </Typography>
            </Box>
            <AppBoxStoreButtons appPackage={appPackage} />
            <Box
                sx={{
                    mt: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    color: 'primary.main',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                }}
            >
                {selected ? 'Grades below' : 'Choose grades'}
                <ArrowForward sx={{ fontSize: 16 }} />
            </Box>
        </Box>
    );
}

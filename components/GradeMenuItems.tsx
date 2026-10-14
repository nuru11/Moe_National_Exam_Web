import React from 'react';
import { ListSubheader, MenuItem } from '@mui/material';
import { WEB_GRADE_APPS } from '@/lib/config/app';
import type { WebsiteGrade } from '@/lib/types';

/** Direct children of a MUI select, grouped by app. */
export default function gradeMenuItems(grades: WebsiteGrade[] | undefined) {
    if (!grades?.length) {
        return null;
    }

    const items: React.ReactNode[] = [];
    for (const app of WEB_GRADE_APPS) {
        const gradesForApp = grades.filter((grade) => grade.appPackage === app.package);
        if (gradesForApp.length === 0) {
            continue;
        }
        items.push(
            <ListSubheader key={`${app.package}-header`} disableSticky>
                {app.label}
            </ListSubheader>
        );
        for (const grade of gradesForApp) {
            items.push(
                <MenuItem key={grade.id} value={grade.id}>
                    {grade.name}
                </MenuItem>
            );
        }
    }
    return items;
}

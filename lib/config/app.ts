/** Website accounts. Separate from the mobile app package. */
export const APP_PACKAGE =
    process.env.NEXT_PUBLIC_APP_PACKAGE || 'com.vector_academy.web';

/** Entrance Tricks grades and exams. */
export const CONTENT_APP_PACKAGE =
    process.env.NEXT_PUBLIC_CONTENT_APP_PACKAGE || 'com.vector_academy.app';

/** Apps whose grades a website account may choose. */
export const WEB_GRADE_APPS = [
    { package: CONTENT_APP_PACKAGE, label: 'Entrance' },
    { package: 'com.freshman_tricks.app', label: 'Freshman' },
    { package: 'com.remedial_tricks.app', label: 'Remedial' },
    { package: 'com.ethio_exit_exam.app', label: 'Ethio Exit Exam' },
    { package: 'com.ministry_tricks.app', label: 'Ministry' },
] as const;

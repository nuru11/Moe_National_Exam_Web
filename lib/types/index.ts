

export type Grade = {
    id: number;
    name: string;
    appPackage?: string | null;
}
export type Choice = {
    id: number;
    content: string;
    isCorrect: boolean;
}

export type User = {
    id: number;
    firstName: string;
    lastName: string | null;
    phoneNumber: string | null;
    email: string | null;
    isPhoneVerified: boolean;
    profilePic: string | null;
    grade: Grade;
    createdAt: string;
    updatedAt: string;
}


export type UserRequest = {
    first_name: string;
    last_name: string | null;
    phone_number: string;
    password: string;
    grade_id: number;
}

export type AuthUserRequest = {
    phone_number: string;
    password: string;
}

export type QuestionResponse = {
    id: number;
    content: string;
    image: string | null;
    choices: Choice[];
    imagePath: string | null;
    explanation: string | null;
    hasUserAnswered: boolean;
}


export type News = {
    id: number;
    title: string;
    content: string;
    coverImage: string;
    category: string;
    createdAt: string;
}


export type AuthToken = {
    accessToken: string;
    refreshToken: string;
}


export type AuthResponse = {
    user: User;
    tokens: AuthToken;
}


export type LeaderboardEntry = {
    rank: number;
    userId: number;
    userName: string;
    userImage: string | null;
    score: number;
    examId: number | null;
    examName: string | null;
    competitionId: number | null;
    competitionName: string | null;
}

export type Subject = {
    id: number;
    name: string;
    description?: string;
    icon?: string | null;

}

export type ExamResponse = {
    id: number;
    name: string;
    examType: string;
    modeType: string;
    year: string | null;
    hasUserAttempted: boolean;
    totalQuestions: number | null;
    givenTimeInMinutes: number;
    isLocked: boolean;
    subject: Subject | null;
    image: string | null;
    createdAt: string;
    updatedAt: string;
}


export type CompetetionResponse = {
    id: number;
    name: string;
    description: string;
    exams: ExamResponse[];
    createdAt: string;
    updatedAt: string;
    isClosed: boolean;
}


export type NewsResponse = {
    id: number;
    title: string;
    content: string;
    coverImage: string | null;
    category: string;
    createdAt: string;
}


export type GradeResponse = {
    id: number;
    name: string;
}

export type WebsiteGrade = GradeResponse & {
    appLabel: string;
    appPackage: string;
}

export type UserStatsResponse = {
    total_exams_taken: number;
    total_score: number;
    rank: number;
}

export type UserAnswerRequest = {
    question: number;
    answer: number;
    exam: number;
}



export type EntranceTricksStatus = {
    totalStudents: number;
    practiceExams: number;
    questions: number;
}

export type Testimonial = {
    id: number;
    name: string;
    image: string;
    testimonial: string;
    title: string | null;
    rating: number;
}

export type UserScoreResponse = {
    totalScore: number;
    competetionName: string;
    competetionId: number;
    hasUserAttempted: boolean;
    exams: [
        {
            id: number;
            examName: string;
            score: number;
            totalQuestions: number;
        }
    ]
}
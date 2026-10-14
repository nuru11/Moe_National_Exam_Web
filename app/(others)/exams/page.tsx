import { Suspense } from 'react';
import ExamsPage from './exams-client';

export default function Page() {
    return (
        <Suspense fallback={<p style={{ textAlign: 'center', padding: '4rem' }}>Loading exams...</p>}>
            <ExamsPage />
        </Suspense>
    );
}

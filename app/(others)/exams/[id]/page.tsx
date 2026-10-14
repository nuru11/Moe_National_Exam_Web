import { Suspense } from 'react';
import ExamDetailPage from './exam-detail-client';

export default function Page() {
    return (
        <Suspense fallback={<p style={{ textAlign: 'center', padding: '4rem' }}>Loading exam...</p>}>
            <ExamDetailPage />
        </Suspense>
    );
}

import { Suspense } from 'react';
import SignInPage from './sign-in-client';

export default function Page() {
    return (
        <Suspense fallback={<p style={{ textAlign: 'center', padding: '4rem' }}>Loading...</p>}>
            <SignInPage />
        </Suspense>
    );
}

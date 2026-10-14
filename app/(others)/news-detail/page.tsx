'use client';
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";


function NewsDetailContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const router = useRouter();

    useEffect(() => {
        if (!id) {
            router.push('/news');
        } else {
            router.push(`/news/${id}/`);
        }
    }, [id, router]);

    return null;
}

export default function NewsDetailPage() {
    return (
        <Suspense fallback={null}>
            <NewsDetailContent />
        </Suspense>
    );
}
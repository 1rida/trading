"use client";

import { useAuth } from '@/lib/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push(`/signin?callbackUrl=${encodeURIComponent(pathname)}`);
        }
    }, [user, isLoading, router, pathname]);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
    }

    return user ? <>{children}</> : null;
};

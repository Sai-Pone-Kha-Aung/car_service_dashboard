'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedAuthState = localStorage.getItem("isAuthenticated");
        if (storedAuthState === 'true') {
            setLoading(false);
        } else {
            router.push('/singin');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = ({ children, adminEmail }: { children: React.ReactNode, adminEmail: string }) => {
    const { isAuthenticated, userEmail } = useAuth();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedAuthState = localStorage.getItem("isAuthenticated");
        const storedUserEmail = localStorage.getItem("userEmail");
        if (storedAuthState === 'true' && storedUserEmail) {
            if (storedUserEmail !== adminEmail) {
                router.push('/');
            } else {
                setLoading(false);
            }
        } else {
            router.push('/sign-in');
        }
    }, [router, adminEmail]);

    if (!isAuthenticated || userEmail !== adminEmail) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
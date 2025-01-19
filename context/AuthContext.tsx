'use client'
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    userEmail: string | null;
    login: (email: string) => void;
    logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const storedAuthState = localStorage.getItem("isAuthenticated");
        const storedUserEmail = localStorage.getItem("userEmail");
        if (storedAuthState === 'true') {
            setIsAuthenticated(true);
            setUserEmail(storedUserEmail);
        }
    }, []);

    const login = (email: string) => {
        setIsAuthenticated(true);
        setUserEmail(email);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", email);
    }
    const logout = () => {
        setIsAuthenticated(false);
        setUserEmail(null);
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userEmail");
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
'use client'
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedAuthState = localStorage.getItem("isAuthenticated");
        if (storedAuthState === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const login = () => {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
    }
    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
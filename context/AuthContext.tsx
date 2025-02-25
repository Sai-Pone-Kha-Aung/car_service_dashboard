'use client'
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    userEmail: string | null;
    userData: CustomerData | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userData, setUserData] = useState<CustomerData | null>(null);

    useEffect(() => {
        const storedAuthState = localStorage.getItem("isAuthenticated");
        const storedUserEmail = localStorage.getItem("userEmail");
        const storedUserData = localStorage.getItem("userData");
        if (storedAuthState === 'true' && storedUserEmail && storedUserData) {
            setIsAuthenticated(true);
            setUserEmail(storedUserEmail);
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const login = async (email: string, password: string) => {
        // Check for admin credentials first
        if (email === "admin@carservicepro.com" && password === "admin") {
            const adminUser = {
                email: "admin@carservicepro.com",
                role: "admin",
                name: "Administrator"
            };
            setIsAuthenticated(true);
            setUserEmail(adminUser.email);
            localStorage.setItem("isAuthenticated", 'true');
            localStorage.setItem("userEmail", adminUser.email);
            localStorage.setItem("userData", JSON.stringify(adminUser));
            return;
        }

        // Regular user authentication
        const response = await fetch('/api/sign_in', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        console.log("User Data:", data);
        if (data.success) {
            setIsAuthenticated(true);
            setUserEmail(data.user.email);
            setUserData(data.user);
            localStorage.setItem("isAuthenticated", 'true');
            localStorage.setItem("userEmail", data.user.email);
            localStorage.setItem("userData", JSON.stringify(data.user));
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserEmail(null);
        setUserData(null);
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userData");
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, userEmail, userData, login, logout }}>
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
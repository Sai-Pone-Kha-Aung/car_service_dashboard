'use client'
import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { EyeIcon, EyeOffIcon, LockIcon, Mail, UserIcon } from 'lucide-react'
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

const Page = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login, isAuthenticated, userEmail } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (isAuthenticated) {
            if (email === 'admin@carservicepro.com') {
                router.push('/admin')
            } else {
                router.push('/')
            }
        }
    }, [isAuthenticated, userEmail, router])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if ((email === 'admin@carservicepro.com' && password === 'admin') || (email === 'user@carservicepro.com' && password === 'user')) {
            login(email);
            if (email === 'admin@carservicepro.com') {
                router.push('/admin');
            } else {
                router.push('/user-dashboard');
            }
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-none text-white">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Log-In To Your Account</CardTitle>
                    <CardDescription className="text-center text-blue-100">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-blue-100">Full Name</Label>
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
                                <Input
                                    id="name"
                                    type="name"
                                    placeholder="Enter your full name"
                                    className="bg-white/20 border-none pl-10 placeholder:text-blue-200 text-white"
                                    value={email}
                                    onChange={() => { }}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-blue-100">Full Name</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your full name"
                                    className="bg-white/20 border-none pl-10 placeholder:text-blue-200 text-white"
                                    value={email}
                                    onChange={() => { }}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-blue-100">Password</Label>
                            <div className="relative">
                                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a strong password"
                                    className="bg-white/20 border-none pl-10 pr-10 placeholder:text-blue-200 text-white"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="h-4 w-4 text-blue-300" />
                                    ) : (
                                        <EyeIcon className="h-4 w-4 text-blue-300" />
                                    )}
                                    <span className="sr-only">
                                        {showPassword ? "Hide password" : "Show password"}
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                            Sign Up
                        </Button>
                        <div className="flex items-center justify-between mt-4 text-center">
                            <span className="text-blue-100">Already have an account?</span>
                            <Button
                                type="button"
                                variant="link"
                                className="text-blue-300 hover:text-blue-200 hover:underline"
                                onClick={() => router.push("/sign-in")}
                            >
                                Sign In
                            </Button>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

export default Page
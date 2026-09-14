"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, mockAuthService } from './mock-auth';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean, message?: string }>;
    logout: () => void;
    updateProfile: (fullName: string) => Promise<{ success: boolean, message?: string }>;
    changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean, message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('auth-user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        const result = mockAuthService.login(email, password);
        if (result.success && result.user) {
            setUser(result.user);
            localStorage.setItem('auth-user', JSON.stringify(result.user));
            return { success: true };
        }
        return { success: false, message: result.message };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('auth-user');
        mockAuthService.logout();
    };

    const updateProfile = async (fullName: string) => {
        if (!user) return { success: false, message: 'Not authenticated' };
        const result = mockAuthService.updateProfile(user.email, fullName);
        if (result.success && result.user) {
            setUser(result.user);
            localStorage.setItem('auth-user', JSON.stringify(result.user));
            return { success: true };
        }
        return { success: false, message: result.message };
    };

    const changePassword = async (currentPassword: string, newPassword: string) => {
        if (!user) return { success: false, message: 'Not authenticated' };
        return mockAuthService.changePassword(user.email, currentPassword, newPassword);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, updateProfile, changePassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};

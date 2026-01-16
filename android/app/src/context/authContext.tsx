import React, { createContext, useEffect, useState } from 'react';
import { getSession, setSession, clearSession } from '../storage/authStorage';

type AuthContextType = {
    isAuthenticated: boolean;
    loading: boolean;
    login: (session:any) => Promise<void>;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    loading: true,
    login: async () => {},
    logout: async () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const boot = async () => {
            const session = await getSession();
            setIsAuthenticated(!!session);
            setLoading(false);
        };
        boot();
    }, []);

    const login = async (session: any) => {
        await setSession(session);
        setIsAuthenticated(true);
    }

    const logout = async () => {
        await clearSession();
        setSession(null);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
            {children}
        </AuthContext.Provider>    
    )
}
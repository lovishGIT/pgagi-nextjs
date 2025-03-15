import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

interface AuthProviderProps {
    children: React.ReactNode;
    session?: Session | null;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
    children,
    session,
}) => {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    );
};
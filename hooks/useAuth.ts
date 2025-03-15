import { useSession, signIn, signOut } from 'next-auth/react';

export const useAuth = () => {
    const { data: session, status } = useSession();
    const isLoading = status === 'loading';
    const isAuthenticated = !!session;

    return {
        session,
        isLoading,
        isAuthenticated,
        signIn,
        signOut,
    };
};
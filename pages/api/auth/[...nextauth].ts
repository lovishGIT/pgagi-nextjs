import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (
                    credentials?.email === 'user@example.com' &&
                    credentials?.password === 'password'
                ) {
                    return {
                        id: '1',
                        name: 'Demo User',
                        email: 'user@example.com',
                    };
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error',
    },
    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token; // Works for OAuth (GitHub, Google)
            }
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.user = token.user as typeof session.user;
            return session;
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 15 * 24 * 60 * 60, // 15 days
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
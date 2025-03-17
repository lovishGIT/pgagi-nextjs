import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { getProviders, signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';
import {
    Sun,
    Moon,
    CheckCircle,
    AlertCircle,
    Github,
    Loader,
} from 'lucide-react';

interface SignInProps {
    providers: Awaited<ReturnType<typeof getProviders>>;
    csrfToken: string;
}

export default function SignIn({
    providers,
    csrfToken,
}: SignInProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isDark, setIsDark] = useState(false);

    // Extract query parameters
    const searchParams =
        typeof window !== 'undefined'
            ? new URLSearchParams(window.location.search)
            : new URLSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const registered = searchParams.get('registered') || '';

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const darkModeEnabled =
                localStorage.getItem('darkMode') === 'true' ||
                window.matchMedia('(prefers-color-scheme: dark)')
                    .matches;

            setIsDark(darkModeEnabled);

            if (darkModeEnabled) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }, []);

    const toggleDarkMode = () => {
        setIsDark(!isDark);

        if (!isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
    };

    const handleCredentialSignIn = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
                callbackUrl: callbackUrl || '/',
            });

            if (result?.error) {
                setError('Invalid email or password');
                setIsLoading(false);
            } else if (result?.url) {
                router.push(result.url);
            }
        } catch (error) {
            console.error('Error during sign in:', error);
            setError('An error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Sign In | MyApp</title>
                <meta
                    name="description"
                    content="Sign in to your dashboard account"
                />
            </Head>

            <div className="min-h-screen flex flex-col items-center justify-center bg-background dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors duration-200">
                    {registered && (
                        <div className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <CheckCircle className="h-5 w-5 text-green-400" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-green-700 dark:text-green-300">
                                        Registration successful!
                                        Please sign in with your new
                                        account.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="absolute top-4 right-4">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Toggle dark mode"
                        >
                            {isDark ? (
                                <Sun className="h-5 w-5 text-yellow-400" />
                            ) : (
                                <Moon className="h-5 w-5 text-gray-700" />
                            )}
                        </button>
                    </div>

                    <div className="px-6 pt-10 pb-8">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Welcome Back
                            </h1>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Sign in to access your personalized
                                dashboard
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/50 border-l-4 border-red-500 p-4 mb-6 rounded">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <AlertCircle className="h-5 w-5 text-red-400" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700 dark:text-red-300">
                                            {error}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form
                            className="space-y-6"
                            onSubmit={handleCredentialSignIn}
                        >
                            <input
                                name="csrfToken"
                                type="hidden"
                                defaultValue={csrfToken}
                            />

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember_me"
                                        name="remember_me"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                                    />
                                    <label
                                        htmlFor="remember_me"
                                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                                    >
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <Link
                                        href="/auth/forgot-password"
                                        className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-800 ${
                                        isLoading
                                            ? 'opacity-75 cursor-not-allowed'
                                            : ''
                                    }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                            Signing in...
                                        </>
                                    ) : (
                                        'Sign in'
                                    )}
                                </button>
                            </div>
                        </form>

                        {providers &&
                            Object.values(providers).some(
                                (provider) =>
                                    provider.name !== 'Credentials'
                            ) && (
                                <div className="mt-8">
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                                Or continue with
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-6 grid grid-cols-2 gap-3">
                                        {Object.values(providers).map(
                                            (provider) => {
                                                if (
                                                    provider.name ===
                                                    'Credentials'
                                                )
                                                    return null;

                                                const providerIcon =
                                                    () => {
                                                        switch (
                                                            provider.name
                                                        ) {
                                                            case 'GitHub':
                                                                return (
                                                                    <Github className="w-5 h-5" />
                                                                );
                                                            case 'Google':
                                                                return (
                                                                    <span className="flex items-center justify-center w-5 h-5 text-red-500 font-bold">
                                                                        G
                                                                    </span>
                                                                );
                                                            default:
                                                                return null;
                                                        }
                                                    };

                                                return (
                                                    <button
                                                        key={
                                                            provider.name
                                                        }
                                                        onClick={() =>
                                                            signIn(
                                                                provider.id,
                                                                {
                                                                    callbackUrl:
                                                                        callbackUrl ||
                                                                        '/',
                                                                }
                                                            )
                                                        }
                                                        className="flex items-center justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                                                    >
                                                        <span className="sr-only">
                                                            Sign in
                                                            with{' '}
                                                            {
                                                                provider.name
                                                            }
                                                        </span>
                                                        {providerIcon()}
                                                        <span className="ml-2">
                                                            {
                                                                provider.name
                                                            }
                                                        </span>
                                                    </button>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            )}
                    </div>

                    <div className="px-6 py-4 text-center">
                            Don&apos;t have an account?{' '}
                            <Link
                                href="/auth/signup"
                                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition ease-in-out duration-150"
                            >
                                Sign up
                            </Link>

                    </div>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (
    context
) => {
    const session = await getSession(context);
    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const providers = await getProviders();
    return {
        props: { providers },
    };
};

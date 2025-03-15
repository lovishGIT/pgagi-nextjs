import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

export default function Signup() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSignup = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess(false);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const name = formData.get('name') as string;

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Signup failed');
            }

            setSuccess(true);
            router.push('/auth/signin?registered=true');
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'An error occurred'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Sign Up | Dashboard App</title>
            </Head>

            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="px-6 pt-10 pb-8">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-gray-900">
                                Create an Account
                            </h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Sign up to access your dashboard
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
                                <p className="text-sm text-red-700">
                                    {error}
                                </p>
                            </div>
                        )}

                        {success && (
                            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
                                <p className="text-sm text-green-700">
                                    Account created! Redirecting to
                                    sign in...
                                </p>
                            </div>
                        )}

                        <form
                            className="space-y-6"
                            onSubmit={handleSignup}
                        >
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                        isLoading
                                            ? 'opacity-75 cursor-not-allowed'
                                            : ''
                                    }`}
                                >
                                    {isLoading
                                        ? 'Signing up...'
                                        : 'Sign up'}
                                </button>
                            </div>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link
                                    href="/auth/signin"
                                    className="font-medium text-blue-600 hover:text-blue-500"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

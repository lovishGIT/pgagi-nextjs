import React from 'react';
import Sidebar from '@/components/global/Sidebar';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const { isAuthenticated, session, signOut } = useAuth();

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <main
                className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ml-0 md:ml-${
                    sidebarOpen ? '64' : '20'
                }`}
            >
                <header className="bg-white shadow-sm">
                    <div className="container mx-auto p-4 flex justify-between items-center">
                        <h1 className="text-lg font-medium">
                            Dashboard
                        </h1>
                        <div>
                            {isAuthenticated ? (
                                <div className="flex items-center space-x-4">
                                    <span>
                                        Welcome, {session?.user?.name}
                                    </span>
                                    <button
                                        onClick={() => signOut()}
                                        className="px-3 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            ) : (
                                <Link href="/auth/signin" className="px-3 py-1 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">
                                    Sign in
                                </Link>
                            )}
                        </div>
                    </div>
                </header>
                <div className="container mx-auto p-4 md:p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}

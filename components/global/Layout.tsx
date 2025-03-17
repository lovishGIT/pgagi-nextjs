import React from 'react';
import Sidebar from '@/components/global/Sidebar';
import clsx from 'clsx';

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = React.useState(true);

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <div
                className={clsx(
                    'flex flex-col flex-1 transition-all duration-300 ease-in-out',
                    sidebarOpen ? 'ml-64' : 'ml-20'
                )}
            >

                <main className="flex-1 overflow-y-auto">
                    <div className="container mx-auto p-4 md:p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

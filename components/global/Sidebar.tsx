'use client';

import React from 'react';
import { useDarkMode } from '@/hooks/useDarkMode';
import CommandButton from '@/components/global/CommandButton';
import {
    Moon,
    Sun,
    Menu,
    X,
    Home,
    Calendar,
    Cloud,
    TrendingUp,
    Newspaper,
    Settings,
    ChevronRight,
    LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItemProps = {
    href: string;
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick?: () => void;
};

const NavItem: React.FC<NavItemProps> = ({
    href,
    icon,
    label,
    isActive,
    onClick,
}) => {
    return (
        <Link
            href={href}
            className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
                ${
                    isActive
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-sidebar-foreground hover:bg-muted hover:text-sidebar-foreground-hover'
                }
            `}
            onClick={onClick}
        >
            <span className="flex-shrink-0">{icon}</span>
            <span className="flex-grow">{label}</span>
            {isActive && <ChevronRight className="w-4 h-4" />}
        </Link>
    );
};

export default function Sidebar({ sidebarOpen, setSidebarOpen }: {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}) {
    const { isDark, toggleDarkMode } = useDarkMode();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const pathname = usePathname();

    const navLinks = [
        {
            name: 'Home',
            href: '/',
            icon: <Home className="w-5 h-5" />,
        },
        {
            name: 'Calendar',
            href: '/calendar',
            icon: <Calendar className="w-5 h-5" />,
        },
        {
            name: 'Weather',
            href: '/weather',
            icon: <Cloud className="w-5 h-5" />,
        },
        {
            name: 'Stocks',
            href: '/stocks',
            icon: <TrendingUp className="w-5 h-5" />,
        },
        {
            name: 'News',
            href: '/news',
            icon: <Newspaper className="w-5 h-5" />,
        },
        {
            name: 'Settings',
            href: '/settings',
            icon: <Settings className="w-5 h-5" />,
        },
    ];

    const closeMobileMenu = () => {
        if (window.innerWidth < 768) {
            setMobileMenuOpen(false);
        }
    };

    const sidebarContent = (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
                <Link href="/" className="flex-shrink-0">
                    <h1 className="text-xl font-bold text-sidebar-foreground">
                        MyApp
                    </h1>
                </Link>

                <div className="flex items-center gap-2">
                    {!sidebarOpen && (
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="md:hidden p-2 rounded-md hover:bg-muted"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    )}

                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="md:hidden p-2 rounded-md hover:bg-muted"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="p-4">
                <CommandButton />
            </div>

            <nav className="flex-grow mt-2 px-2 space-y-1 overflow-y-auto">
                {navLinks.map((link) => (
                    <NavItem
                        key={link.name}
                        href={link.href}
                        icon={link.icon}
                        label={link.name}
                        isActive={pathname === link.href}
                        onClick={closeMobileMenu}
                    />
                ))}
            </nav>

            <div className="p-4 border-t border-sidebar-border mt-auto">
                <div className="flex items-center justify-between">
                    <button
                        onClick={toggleDarkMode}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors duration-200"
                    >
                        {isDark ? (
                            <>
                                <Moon className="w-5 h-5" />
                                <span>Dark Mode</span>
                            </>
                        ) : (
                            <>
                                <Sun className="w-5 h-5" />
                                <span>Light Mode</span>
                            </>
                        )}
                    </button>
                </div>

                <Link href="/auth/signout" className="flex items-center gap-3 px-4 py-2 mt-2 w-full rounded-lg text-destructive hover:bg-destructive/10 transition-colors duration-200">
                    <LogOut className="w-5 h-5" />
                    <span>Log Out</span>
                </Link>
            </div>
        </div>
    );

    return (
        <>
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            <div className="fixed top-4 left-4 z-30 md:hidden">
                {!mobileMenuOpen && (
                    <button
                        className="p-2 rounded-md bg-sidebar text-sidebar-foreground hover:bg-muted shadow-md"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                )}
            </div>

            <div
                className={`
                    fixed inset-y-0 left-0 z-50 w-64 bg-sidebar shadow-xl transform transition-transform duration-300 ease-in-out md:hidden
                    ${
                        mobileMenuOpen
                            ? 'translate-x-0'
                            : '-translate-x-full'
                    }
                `}
            >
                {sidebarContent}
            </div>

            <div
                className={`
                    hidden md:block fixed inset-y-0 left-0 z-30 bg-sidebar border-r border-sidebar-border transform transition-all duration-300 ease-in-out
                    ${sidebarOpen ? 'w-64' : 'w-20'}
                `}
            >
                {sidebarOpen ? (
                    sidebarContent
                ) : (
                    <div className="flex flex-col h-full items-center p-4 space-y-6">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="mb-6"
                        >
                            <h1 className="text-xl font-bold text-sidebar-foreground">
                                Pgagi Dev
                            </h1>
                        </button>

                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`p-2 rounded-lg transition-colors duration-200 ${
                                    pathname === link.href
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-sidebar-foreground hover:bg-muted'
                                }`}
                                title={link.name}
                            >
                                {link.icon}
                            </Link>
                        ))}

                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg hover:bg-muted transition-colors duration-200 mt-auto"
                            title={
                                isDark
                                    ? 'Switch to light mode'
                                    : 'Switch to dark mode'
                            }
                        >
                            {isDark ? (
                                <Moon className="w-5 h-5" />
                            ) : (
                                <Sun className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

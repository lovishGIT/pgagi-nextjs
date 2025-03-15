import React from 'react';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

// Define the page structure types
type PageItem = {
    title: string;
    href: string;
    icon?: React.ReactNode;
    description?: string;
};

const CommandButton: React.FC = () => {
    const [open, setOpen] = React.useState<boolean>(false);
    const router = useRouter();

    // Pages configuration - you can expand this
    const pages: PageItem[] = [
        {
            title: 'Home',
            href: '/',
            description: 'Return to the homepage',
        },
        {
            title: 'Calendar',
            href: '/calendar',
            description: 'View your schedule and events',
        },
        {
            title: 'Weather',
            href: '/weather',
            description: 'Check current weather conditions',
        },
        {
            title: 'Stocks',
            href: '/stocks',
            description: 'Monitor your investments',
        },
        {
            title: 'News',
            href: '/news',
            description: 'Stay updated with the latest headlines',
        },
        {
            title: 'Settings',
            href: '/settings',
            description: 'Manage your preferences',
        },
        {
            title: 'Profile',
            href: '/profile',
            description: 'View and edit your account information',
        },
    ];

    // Handle navigation
    const handleNavigate = (href: string) => {
        router.push(href);
        setOpen(false);
    };

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpen(false);
            }
            if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                setOpen(true);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="w-full">
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-4 py-2 w-full text-sm font-medium bg-secondary/80 rounded-lg hover:bg-secondary transition-colors duration-200 shadow-sm"
                aria-label="Search Command"
            >
                <Search className="w-4 h-4" />
                <span className="flex-grow text-left">Search</span>
                <kbd className="text-xs px-1.5 py-0.5 bg-muted rounded">
                    ⌘K
                </kbd>
            </button>

            <CommandDialog
                open={open}
                onOpenChange={setOpen}
                label="Type a command or search..."
            >
                <CommandInput placeholder="Search for pages, features, or help..." />
                <CommandList>
                    <CommandEmpty>
                        No results found. Try a different search.
                    </CommandEmpty>

                    <CommandGroup heading="Pages">
                        {pages.map((page) => (
                            <CommandItem
                                key={page.href}
                                onSelect={() =>
                                    handleNavigate(page.href)
                                }
                                className="flex items-center justify-between cursor-pointer"
                            >
                                <div className="flex flex-col">
                                    <span>{page.title}</span>
                                    {page.description && (
                                        <span className="text-xs text-muted-foreground">
                                            {page.description}
                                        </span>
                                    )}
                                </div>
                                <kbd className="text-xs px-1.5 py-0.5 bg-muted rounded">
                                    ↵
                                </kbd>
                            </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandGroup heading="Actions">
                        <CommandItem
                            onSelect={() => {
                                setOpen(false);
                                // You can add other actions here
                            }}
                        >
                            <span>Log out</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={() => {
                                setOpen(false);
                                // Theme toggle action
                            }}
                        >
                            <span>Toggle theme</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </div>
    );
};

export default CommandButton;

import { useEffect, useState } from 'react';

export function useDarkMode() {
    const [isDark, setIsDark] = useState<boolean>(
        () =>
            typeof window !== 'undefined' &&
            localStorage.getItem('theme') === 'dark'
    );

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return {
        isDark,
        toggleDarkMode: () => setIsDark((prev) => !prev),
    };
}
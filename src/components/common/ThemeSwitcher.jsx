import React, { useEffect } from 'react';
import useAppStore from '../../store/useAppStore';
import { Palette } from 'lucide-react';

const themes = [
    "light", "dark", "cupcake", "retro", "cyberpunk", "dracula", "coffee", "business", "lemonade"
];

const ThemeSwitcher = () => {
    const { theme, setTheme } = useAppStore();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <Palette className="w-5 h-5" />
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52 max-h-96 overflow-y-auto flex-nowrap">
                {themes.map((t) => (
                    <li key={t}>
                        <button
                            className={`${theme === t ? 'active' : ''}`}
                            onClick={() => setTheme(t)}
                        >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ThemeSwitcher;

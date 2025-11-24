import React from 'react';
import { Menu, Settings } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';
import useAppStore from '../../store/useAppStore';

const Navbar = ({ toggleSidebar }) => {
    const { mode, setMode } = useAppStore();

    return (
        <div className="navbar bg-base-100 border-b border-base-300 h-16 min-h-[4rem]">
            <div className="flex-none">
                <button className="btn btn-square btn-ghost lg:hidden" onClick={toggleSidebar}>
                    <Menu className="w-5 h-5" />
                </button>
            </div>
            <div className="flex-1 px-2 mx-2">
                <span className="text-xl font-bold text-primary mr-8">AlgoViz</span>
                <div className="hidden lg:flex gap-2">
                    <button
                        className={`btn btn-sm ${mode === 'sorting' ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setMode('sorting')}
                    >
                        Sorting
                    </button>
                    <button
                        className={`btn btn-sm ${mode === 'pathfinding' ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setMode('pathfinding')}
                    >
                        Pathfinding
                    </button>
                </div>
            </div>
            <div className="flex-none gap-2">
                <ThemeSwitcher />
                <button className="btn btn-ghost btn-circle">
                    <Settings className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default Navbar;

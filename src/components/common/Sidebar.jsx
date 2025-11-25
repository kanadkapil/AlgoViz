import React from 'react';
import useAppStore from '../../store/useAppStore';
import SortingControls from '../sorting/SortingControls';
import PathfindingControls from '../pathfinding/PathfindingControls';

const Sidebar = ({ isOpen, closeSidebar, mode, setMode }) => {
    // Fallback to store if props aren't passed (though Layout passes them)
    // const { mode, setMode } = useAppStore(); 

    return (
        <div className="drawer-side z-50">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content flex flex-col gap-4">
                {/* Header with Close Button */}
                <div className="flex justify-between items-center lg:hidden">
                    <h2 className="text-lg font-bold">Menu</h2>
                    <button className="btn btn-square btn-ghost btn-sm" onClick={closeSidebar}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Mobile Mode Switcher */}
                <div className="flex flex-col gap-2 lg:hidden">
                    <h3 className="font-semibold opacity-70">Mode</h3>
                    <div className="join w-full">
                        <button 
                            className={`btn join-item flex-1 ${mode === 'home' ? 'btn-primary' : 'btn-neutral'}`}
                            onClick={() => { setMode('home'); closeSidebar(); }}
                        >
                            Home
                        </button>
                        <button 
                            className={`btn join-item flex-1 ${mode === 'visualization' || mode === 'sorting' || mode === 'pathfinding' ? 'btn-primary' : 'btn-neutral'}`}
                            onClick={() => { setMode('visualization'); closeSidebar(); }}
                        >
                            Visualize
                        </button>
                    </div>
                    <div className="join w-full mt-2">
                        <button 
                            className={`btn join-item flex-1 ${mode === 'theory' ? 'btn-primary' : 'btn-neutral'}`}
                            onClick={() => { setMode('theory'); closeSidebar(); }}
                        >
                            Theory
                        </button>
                        <button 
                            className={`btn join-item flex-1 ${mode === 'metrics' ? 'btn-primary' : 'btn-neutral'}`}
                            onClick={() => { setMode('metrics'); closeSidebar(); }}
                        >
                            Metrics
                        </button>
                    </div>
                    <div className="divider my-2"></div>
                </div>

                <h2 className="text-lg font-bold mb-2 hidden lg:block">Controls</h2>

                {/* Specific controls based on mode */}
                <div className="flex-1">
                    {mode === 'sorting' ? (
                        <div>
                            <h3 className="font-semibold opacity-70 mb-2">Sorting Options</h3>
                            <SortingControls />
                        </div>
                    ) : (
                        <div>
                            <h3 className="font-semibold opacity-70 mb-2">Pathfinding Options</h3>
                            <PathfindingControls />
                        </div>
                    )}
                </div>

                <div className="divider"></div>

                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold opacity-70">Statistics</h3>
                    <div className="stats shadow stats-vertical bg-base-100">
                        <div className="stat place-items-center p-2">
                            <div className="stat-title text-xs">Operations</div>
                            <div className="stat-value text-lg">0</div>
                        </div>
                        <div className="stat place-items-center p-2">
                            <div className="stat-title text-xs">Time</div>
                            <div className="stat-value text-lg">0ms</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

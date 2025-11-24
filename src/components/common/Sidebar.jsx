import React from 'react';
import useAppStore from '../../store/useAppStore';
import SortingControls from '../sorting/SortingControls';
import PathfindingControls from '../pathfinding/PathfindingControls';

const Sidebar = ({ isOpen, closeSidebar }) => {
    const { mode } = useAppStore();

    return (
        <div className={`drawer-side z-20 ${isOpen ? 'drawer-open' : ''}`}>
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay" onClick={closeSidebar}></label>
            <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content flex flex-col gap-4">
                <h2 className="text-lg font-bold mb-2">Controls</h2>

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

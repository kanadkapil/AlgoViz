import React from 'react';
import usePathfindingStore from '../../store/usePathfindingStore';

const Node = ({ row, col, isStart, isEnd, isWall, isVisited, isPath, onMouseDown, onMouseEnter, onMouseUp }) => {
    let extraClass = '';
    if (isStart) extraClass = 'bg-success';
    else if (isEnd) extraClass = 'bg-error';
    else if (isWall) extraClass = 'bg-slate-900'; // Darker color for walls
    else if (isPath) extraClass = 'bg-warning animate-pulse';
    else if (isVisited) extraClass = 'bg-info animate-pulse';
    else extraClass = 'bg-base-200 border border-base-300';

    return (
        <div
            id={`node-${row}-${col}`}
            className={`w-6 h-6 ${extraClass}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()}
        ></div>
    );
};

const PathfindingGrid = () => {
    const { grid, toggleWall, mouseIsPressed } = usePathfindingStore();

    const handleMouseDown = (row, col) => {
        usePathfindingStore.setState({ mouseIsPressed: true });
        toggleWall(row, col);
    };

    const handleMouseEnter = (row, col) => {
        if (mouseIsPressed) {
            toggleWall(row, col);
        }
    };

    const handleMouseUp = () => {
        usePathfindingStore.setState({ mouseIsPressed: false });
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full overflow-auto p-4">
            <div className="grid gap-[1px] bg-base-300 border border-base-300" style={{ gridTemplateColumns: `repeat(${grid[0].length}, 1fr)` }}>
                {grid.map((row, rowIdx) => (
                    row.map((node, nodeIdx) => (
                        <Node
                            key={`${rowIdx}-${nodeIdx}`}
                            {...node}
                            onMouseDown={handleMouseDown}
                            onMouseEnter={handleMouseEnter}
                            onMouseUp={handleMouseUp}
                        />
                    ))
                ))}
            </div>
        </div>
    );
};

export default PathfindingGrid;

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
            className={`w-4 h-4 md:w-6 md:h-6 ${extraClass}`}
            style={{ backgroundColor: isWall ? '#1e293b' : undefined }} // Force slate-800 for walls
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()}
        ></div>
    );
};

const PathfindingGrid = () => {
    const { 
        grid, 
        toggleWall, 
        mouseIsPressed, 
        setMouseIsPressed,
        isDraggingStart,
        setIsDraggingStart,
        isDraggingEnd,
        setIsDraggingEnd,
        moveStartNode,
        moveEndNode
    } = usePathfindingStore();

    const handleMouseDown = (row, col) => {
        setMouseIsPressed(true);
        const node = grid[row][col];
        if (node.isStart) {
            setIsDraggingStart(true);
        } else if (node.isEnd) {
            setIsDraggingEnd(true);
        } else {
            toggleWall(row, col);
        }
    };

    const handleMouseEnter = (row, col) => {
        if (!mouseIsPressed) return;
        
        if (isDraggingStart) {
            moveStartNode(row, col);
        } else if (isDraggingEnd) {
            moveEndNode(row, col);
        } else {
            toggleWall(row, col);
        }
    };

    const handleMouseUp = () => {
        setMouseIsPressed(false);
        setIsDraggingStart(false);
        setIsDraggingEnd(false);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full overflow-auto p-4">
            <div 
                className="grid gap-[1px] bg-base-300 border border-base-300" 
                style={{ 
                    gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
                    width: 'fit-content' // Ensure grid fits content
                }}
                onMouseLeave={handleMouseUp} // Stop dragging if mouse leaves grid
            >
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

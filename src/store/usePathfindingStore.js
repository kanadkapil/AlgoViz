import { create } from 'zustand';

const createGrid = (rows, cols, startNode = { row: 5, col: 5 }, endNode = { row: 15, col: 15 }) => {
    const grid = [];
    for (let row = 0; row < rows; row++) {
        const currentRow = [];
        for (let col = 0; col < cols; col++) {
            currentRow.push({
                row,
                col,
                isStart: row === startNode.row && col === startNode.col,
                isEnd: row === endNode.row && col === endNode.col,
                isWall: false,
                isVisited: false,
                isPath: false,
                distance: Infinity,
                previousNode: null,
            });
        }
        grid.push(currentRow);
    }
    return grid;
};

const usePathfindingStore = create((set, get) => ({
    grid: createGrid(20, 20), // Default square grid
    gridSize: 20, // Default size
    algorithm: 'dijkstra',
    isPlaying: false,
    isFinished: false,
    speed: 50,
    startNode: { row: 5, col: 5 },
    endNode: { row: 15, col: 15 },
    mouseIsPressed: false,
    isDraggingStart: false,
    isDraggingEnd: false,

    setAlgorithm: (algo) => set({ algorithm: algo }),
    setSpeed: (speed) => set({ speed }),
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    
    setGridSize: (size) => {
        const { startNode, endNode } = get();
        // Ensure start/end are within new bounds
        let newStart = { ...startNode };
        let newEnd = { ...endNode };
        
        if (newStart.row >= size) newStart.row = size - 1;
        if (newStart.col >= size) newStart.col = size - 1;
        if (newEnd.row >= size) newEnd.row = size - 1;
        if (newEnd.col >= size) newEnd.col = size - 1;
        
        // Prevent overlap if squeezed
        if (newStart.row === newEnd.row && newStart.col === newEnd.col) {
            newEnd.row = Math.max(0, newStart.row - 1);
        }

        set({ 
            gridSize: size, 
            rows: size, 
            cols: size, 
            startNode: newStart, 
            endNode: newEnd,
            grid: createGrid(size, size, newStart, newEnd) 
        });
    },

    randomizeGrid: () => set((state) => {
        const newGrid = state.grid.map(row => row.map(node => {
            if (node.isStart || node.isEnd) return node;
            return {
                ...node,
                isWall: Math.random() < 0.3, // 30% chance of wall
                isVisited: false,
                isPath: false,
                distance: Infinity,
                previousNode: null
            };
        }));
        return { grid: newGrid, isFinished: false, isPlaying: false };
    }),

    toggleWall: (row, col) => set((state) => {
        const newGrid = state.grid.map((r, rIdx) => {
            if (rIdx === row) {
                return r.map((node, cIdx) => {
                    if (cIdx === col && !node.isStart && !node.isEnd) {
                        return { ...node, isWall: !node.isWall };
                    }
                    return node;
                });
            }
            return r;
        });
        return { grid: newGrid };
    }),

    moveStartNode: (row, col) => set((state) => {
        if (state.grid[row][col].isEnd || state.grid[row][col].isWall) return {};
        const newGrid = state.grid.map((r) => r.map((node) => ({
            ...node,
            isStart: node.row === row && node.col === col
        })));
        return { grid: newGrid, startNode: { row, col } };
    }),

    moveEndNode: (row, col) => set((state) => {
        if (state.grid[row][col].isStart || state.grid[row][col].isWall) return {};
        const newGrid = state.grid.map((r) => r.map((node) => ({
            ...node,
            isEnd: node.row === row && node.col === col
        })));
        return { grid: newGrid, endNode: { row, col } };
    }),

    setIsDraggingStart: (isDragging) => set({ isDraggingStart: isDragging }),
    setIsDraggingEnd: (isDragging) => set({ isDraggingEnd: isDragging }),
    setMouseIsPressed: (isPressed) => set({ mouseIsPressed: isPressed }),

    resetGrid: () => {
        const { gridSize, startNode, endNode } = get();
        set({ grid: createGrid(gridSize, gridSize, startNode, endNode), isFinished: false, isPlaying: false });
    },

    clearPath: () => set((state) => {
        const newGrid = state.grid.map(row => row.map(node => ({
            ...node,
            isVisited: false,
            isPath: false,
            distance: Infinity,
            previousNode: null
        })));
        return { grid: newGrid, isFinished: false, isPlaying: false };
    }),

    setGrid: (grid) => set({ grid }),
    markVisited: (row, col) => set((state) => {
        const newGrid = [...state.grid];
        newGrid[row] = [...newGrid[row]];
        newGrid[row][col] = { ...newGrid[row][col], isVisited: true };
        return { grid: newGrid };
    }),
    markPath: (row, col) => set((state) => {
        const newGrid = [...state.grid];
        newGrid[row] = [...newGrid[row]];
        newGrid[row][col] = { ...newGrid[row][col], isPath: true };
        return { grid: newGrid };
    }),
}));

export default usePathfindingStore;

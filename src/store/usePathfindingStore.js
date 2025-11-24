import { create } from 'zustand';

const createGrid = (rows, cols) => {
    const grid = [];
    for (let row = 0; row < rows; row++) {
        const currentRow = [];
        for (let col = 0; col < cols; col++) {
            currentRow.push({
                row,
                col,
                isStart: row === 10 && col === 10,
                isEnd: row === 10 && col === 40,
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
    grid: createGrid(20, 50),
    rows: 20,
    cols: 50,
    algorithm: 'dijkstra',
    isPlaying: false,
    isFinished: false,
    speed: 50,
    startNode: { row: 10, col: 10 },
    endNode: { row: 10, col: 40 },
    mouseIsPressed: false,

    setAlgorithm: (algo) => set({ algorithm: algo }),
    setSpeed: (speed) => set({ speed }),
    setIsPlaying: (isPlaying) => set({ isPlaying }),

    toggleWall: (row, col) => set((state) => {
        console.log(`Toggling wall at ${row}, ${col}`);
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

    resetGrid: () => {
        const { rows, cols } = get();
        set({ grid: createGrid(rows, cols), isFinished: false, isPlaying: false });
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

import { create } from 'zustand';

const generateArray = (size) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 5);
};

const useSortingStore = create((set, get) => ({
    array: generateArray(50),
    arraySize: 50,
    algorithm: 'bubbleSort',
    isPlaying: false,
    isSorted: false,
    speed: 50, // ms delay
    comparisonIndices: [], // Indices being compared
    swapIndices: [], // Indices being swapped
    sortedIndices: [], // Indices that are sorted

    setAlgorithm: (algo) => set({ algorithm: algo }),
    setArraySize: (size) => set({ arraySize: size, array: generateArray(size), isSorted: false, sortedIndices: [] }),
    setSpeed: (speed) => set({ speed }),
    setIsPlaying: (isPlaying) => set({ isPlaying }),

    resetArray: () => {
        const { arraySize } = get();
        set({ array: generateArray(arraySize), isSorted: false, isPlaying: false, sortedIndices: [], comparisonIndices: [], swapIndices: [] });
    },

    setArray: (array) => set({ array }),
    setComparisonIndices: (indices) => set({ comparisonIndices: indices }),
    setSwapIndices: (indices) => set({ swapIndices: indices }),
    setSortedIndices: (indices) => set((state) => ({
        sortedIndices: typeof indices === 'function' ? indices(state.sortedIndices) : indices
    })),
    markSorted: () => set({ isSorted: true, isPlaying: false, comparisonIndices: [], swapIndices: [] }),
}));

export default useSortingStore;

import { create } from 'zustand';

const useAppStore = create((set) => ({
    theme: 'dark',
    mode: 'sorting', // 'sorting' or 'pathfinding'
    isComparisonMode: false,
    isTheoryOpen: false,

    setTheme: (theme) => set({ theme }),
    setMode: (mode) => set({ mode }),
    toggleComparisonMode: () => set((state) => ({ isComparisonMode: !state.isComparisonMode })),
    toggleTheory: () => set((state) => ({ isTheoryOpen: !state.isTheoryOpen })),
}));

export default useAppStore;

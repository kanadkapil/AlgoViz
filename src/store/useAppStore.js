import { create } from 'zustand';

const useAppStore = create((set) => ({
    theme: localStorage.getItem('theme') || 'dark',
    mode: 'home', // 'home', 'sorting', 'pathfinding', 'visualization', 'theory', 'metrics'
    isComparisonMode: false,
    isTheoryOpen: false,

    setTheme: (theme) => {
        localStorage.setItem('theme', theme);
        set({ theme });
    },
    setMode: (mode) => set({ mode }),
    toggleComparisonMode: () => set((state) => ({ isComparisonMode: !state.isComparisonMode })),
    toggleTheory: () => set((state) => ({ isTheoryOpen: !state.isTheoryOpen })),
    openTheory: () => set({ isTheoryOpen: true }),
}));

export default useAppStore;

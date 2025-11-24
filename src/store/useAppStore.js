import { create } from 'zustand';

const useAppStore = create((set) => ({
    theme: 'dark',
    mode: 'sorting', // 'sorting' | 'pathfinding'
    isComparisonMode: false,

    setTheme: (theme) => set({ theme }),
    setMode: (mode) => set({ mode }),
    toggleComparisonMode: () => set((state) => ({ isComparisonMode: !state.isComparisonMode })),
}));

export default useAppStore;

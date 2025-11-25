import { create } from 'zustand';

const useAppStore = create((set) => ({
    theme: localStorage.getItem('theme') || 'dark',
    mode: 'home', // Default to home
    isComparisonMode: false,
    isTheoryOpen: false,

    setTheme: (theme) => {
        localStorage.setItem('theme', theme);
        set({ theme });
    },
    setMode: (mode) => set({ mode }),
    toggleComparisonMode: () => set((state) => ({ isComparisonMode: !state.isComparisonMode })),
    toggleTheory: () => set((state) => ({ isTheoryOpen: !state.isTheoryOpen })),
}));

export default useAppStore;

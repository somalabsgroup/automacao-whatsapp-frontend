import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeMode = 'light' | 'dark';

interface ThemeStore {
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: 'light',
      toggleTheme: () =>
        set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
      setTheme: (mode) => set({ mode }),
    }),
    { name: 'theme-preference' }
  )
);

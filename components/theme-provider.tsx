'use client';

import { createContext, use, useEffect, useSyncExternalStore, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | null>(null);

function getInitialTheme(storageKey: string, defaultTheme: Theme): Theme {
  if (typeof window === 'undefined') return defaultTheme;
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  } catch {}
  return defaultTheme;
}

function canQueryColorScheme() {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function';
}

function getSystemDark(): boolean {
  if (!canQueryColorScheme()) return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function subscribeToColorScheme(cb: () => void) {
  if (!canQueryColorScheme()) return () => {};
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
}

function applyThemeClass(theme: Theme) {
  if (typeof document === 'undefined') return;
  const isDark = theme === 'system' ? getSystemDark() : theme === 'dark';
  document.documentElement.classList.toggle('dark', isDark);
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'purrfold-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return getInitialTheme(storageKey, defaultTheme);
  });

  const systemDark = useSyncExternalStore(subscribeToColorScheme, getSystemDark, () => false);

  const resolvedTheme = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;

  useEffect(() => {
    applyThemeClass(theme);
    try {
      localStorage.setItem(storageKey, theme);
    } catch {}
  }, [theme, storageKey, systemDark]);

  const setTheme = (t: Theme) => {
    setThemeState(t);
  };

  const value = { theme, resolvedTheme, setTheme };

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

export function useTheme() {
  const context = use(ThemeProviderContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

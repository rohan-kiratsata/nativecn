import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useTheme } from './ThemeContext';

// Regular utility for merging classNames
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Theme-aware styling helper
export function useThemedClasses(lightClasses: string, darkClasses: string): string {
  const { theme } = useTheme();
  return theme === 'dark' ? darkClasses : lightClasses;
}

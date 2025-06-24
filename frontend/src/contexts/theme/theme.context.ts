import type { ThemeContextValue } from '@/types/theme.context.types'
import { createContext } from 'react'

export const initialContextValue: ThemeContextValue = {
  themeState: {
    theme: 'light'
  },
  setThemeState: () => {
    throw new Error('setThemeState function must be implemented')
  },
  toggleTheme: () => {
    throw new Error('toggleTheme function must be implemented')
  }
}

export const ThemeContext =
  createContext<ThemeContextValue>(initialContextValue)

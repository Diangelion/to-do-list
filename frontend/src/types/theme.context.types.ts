import type { Dispatch, ReactNode, SetStateAction } from 'react'

export interface ThemeState {
  theme: 'light' | 'dark'
}

export interface ThemeContextValue {
  themeState: ThemeState
  setThemeState: Dispatch<SetStateAction<ThemeState>>
  toggleTheme: () => void
}

export interface ThemeProviderProps {
  children: ReactNode
}

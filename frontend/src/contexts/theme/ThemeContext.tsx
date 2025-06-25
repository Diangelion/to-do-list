import type { ThemeState } from '@/types/theme.context.types'
import React, { useEffect, useState } from 'react'
import { initialContextValue, ThemeContext } from './theme.context'

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [themeState, setThemeState] = useState<ThemeState>(
    initialContextValue.themeState
  )

  useEffect(() => {
    console.log(window.matchMedia('(prefers-color-scheme: dark)'))
  }, [])

  // useEffect(() => {
  //   const saved = localStorage.getItem('theme')
  //   if (saved && ['light', 'dark'].includes(saved)) {
  //     setThemeState(prev => ({ ...prev, theme: saved as 'light' | 'dark' }))
  //     document.documentElement.classList.toggle('dark', saved === 'dark')
  //   }
  // }, [])

  // useEffect(() => {
  //   document.documentElement.classList.toggle(
  //     'dark',
  //     themeState.theme === 'dark'
  //   )
  //   localStorage.setItem('theme', themeState.theme)
  // }, [themeState.theme])

  const toggleTheme = React.useCallback(() => {
    setThemeState(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }))
  }, [])

  const contextValue = React.useMemo(
    () => ({ themeState, setThemeState, toggleTheme }),
    [themeState, setThemeState, toggleTheme]
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider

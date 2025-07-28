import todoListConfig from '@/config/todo-list.config'
import useGlobal from '@/contexts/global/useGlobal'
import {
  initialContextValue,
  ThemeContext
} from '@/contexts/theme/theme.context'
import { get, store } from '@/lib/localStorage.utils'
import type { ThemeState } from '@/types/theme.context.types'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC,
  type ReactNode
} from 'react'

const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { globalState } = useGlobal()
  const themeKey = globalState.env.VITE_LOCAL_STORAGE_THEME_KEY as string

  const [themeState, setThemeState] = useState<ThemeState>(
    initialContextValue.themeState
  )

  const applyTheme = useCallback(
    (theme: 'light' | 'dark') => {
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.documentElement.removeAttribute('data-theme')
      }
      store(themeKey, theme)
    },
    [themeKey]
  )

  useEffect(() => {
    const prefersDark = window.matchMedia(todoListConfig.COLOR_SCHEME).matches
    const savedTheme = get(themeKey) as 'light' | 'dark' | null

    const theme: 'light' | 'dark' =
      savedTheme ?? (prefersDark ? 'dark' : 'light')
    setThemeState(prev => ({ ...prev, theme }))
    applyTheme(theme)
  }, [applyTheme, themeKey])

  const toggleTheme = useCallback(() => {
    setThemeState(prev => {
      const nextTheme = prev.theme === 'light' ? 'dark' : 'light'
      applyTheme(nextTheme)
      return { ...prev, theme: nextTheme }
    })
  }, [applyTheme])

  const contextValue = useMemo(
    () => ({ themeState, setThemeState, toggleTheme }),
    [themeState, toggleTheme]
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider

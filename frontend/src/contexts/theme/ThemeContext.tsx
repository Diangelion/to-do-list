import { colorScheme } from '@/lib/constant'
import { get, store } from '@/lib/localStorage.utils'
import type { ThemeState } from '@/types/theme.context.types'
import {
  type FC,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import useGlobal from '../global/useGlobal'
import { initialContextValue, ThemeContext } from './theme.context'

const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { globalState } = useGlobal()
  const themeKey = globalState.env.VITE_LOCAL_STORAGE_THEME_KEY as string

  const [themeState, setThemeState] = useState<ThemeState>(
    initialContextValue.themeState
  )

  const addDarkTheme = () =>
    document.documentElement.setAttribute('data-theme', 'dark')
  const removeDarkTheme = () =>
    document.documentElement.removeAttribute('data-theme')

  const processTheme = useCallback(
    (theme: string) => {
      if (theme === 'dark') addDarkTheme()
      else removeDarkTheme()
      store(themeKey, theme)
    },
    [themeKey]
  )

  useEffect(() => {
    const savedTheme = get(themeKey) as 'light' | 'dark' | null

    const prefersDark = window.matchMedia(colorScheme).matches
    const theme = savedTheme ?? (prefersDark ? 'dark' : 'light')

    processTheme(theme)
    setThemeState(prev => ({ ...prev, theme }))
  }, [themeKey, setThemeState, processTheme])

  const toggleTheme = useCallback(() => {
    setThemeState(prev => {
      const prevTheme = prev.theme
      const nextTheme = prevTheme === 'light' ? 'dark' : 'light'
      processTheme(nextTheme)
      return { ...prev, theme: nextTheme }
    })
  }, [setThemeState, processTheme])

  const contextValue = useMemo(
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

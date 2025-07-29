import todoListConfig from '@/config/todo-list.config'
import useGlobal from '@/contexts/global/useGlobal'
import {
  initialContextValue,
  ThemeContext
} from '@/contexts/theme/theme.context'
import { localStorage } from '@/services/browser.storage.services'
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
    async (theme: 'light' | 'dark') => {
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.documentElement.removeAttribute('data-theme')
      }
      await localStorage.set(themeKey, theme)
    },
    [themeKey]
  )

  useEffect(() => {
    const initTheme = async () => {
      const prefersDark = window.matchMedia(todoListConfig.COLOR_SCHEME).matches
      const savedTheme = (await localStorage.get(themeKey)) as
        | 'light'
        | 'dark'
        | null

      const theme: 'light' | 'dark' =
        savedTheme ?? (prefersDark ? 'dark' : 'light')
      setThemeState(prev => ({ ...prev, theme }))
      await applyTheme(theme)
    }
    void initTheme()
  }, [applyTheme, themeKey])

  const toggleTheme = useCallback(async () => {
    const nextTheme = themeState.theme === 'light' ? 'dark' : 'light'
    setThemeState(prev => ({ ...prev, theme: nextTheme }))
    await applyTheme(nextTheme)
  }, [themeState.theme, applyTheme])

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

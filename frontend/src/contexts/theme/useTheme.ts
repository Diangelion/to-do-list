import type { ThemeContextValue } from '@/types/theme.context.types'
import { useContext } from 'react'
import { ThemeContext } from './theme.context'

const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext)
  return context
}

export default useTheme

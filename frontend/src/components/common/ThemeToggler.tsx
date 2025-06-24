import { Switch } from '@/components/ui/switch'
import useTheme from '@/contexts/theme/useTheme'
import { Moon, Sun } from 'lucide-react'

const ThemeToggler = () => {
  const { themeState, toggleTheme } = useTheme()

  return (
    <div className='flex items-center space-x-2'>
      {themeState.theme === 'light' ? <Sun /> : <Moon />}
      <Switch
        id='theme-mode'
        className='cursor-pointer'
        onClick={toggleTheme}
      />
    </div>
  )
}

export default ThemeToggler

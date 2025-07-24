import { Switch } from '@/components/ui/switch'
import useTheme from '@/contexts/theme/useTheme'
import { Moon } from 'lucide-react'

const ThemeToggler = () => {
  const { themeState, toggleTheme } = useTheme()

  return (
    <div className='flex items-center space-x-2'>
      <div title='Dark Theme'>
        <Moon />
      </div>
      <Switch
        id='theme-mode'
        className='cursor-pointer'
        onClick={toggleTheme}
        checked={themeState.theme === 'dark'}
      />
    </div>
  )
}

export default ThemeToggler

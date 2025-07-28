import { QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './contexts/auth/AuthContext'
import GlobalProvider from './contexts/global/GlobalContext'
import ThemeProvider from './contexts/theme/ThemeContext'
import { queryClient } from './lib/queryClient.utils'
import AppRouter from './router/AppRouter'

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <ThemeProvider>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </ThemeProvider>
      </GlobalProvider>
    </QueryClientProvider>
  )
}

export default App

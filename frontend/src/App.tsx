import AuthProvider from './contexts/auth/AuthContext'
import GlobalProvider from './contexts/global/GlobalContext'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient.utils'
import AppRouter from './router/AppRouter'

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </GlobalProvider>
    </QueryClientProvider>
  )
}

export default App

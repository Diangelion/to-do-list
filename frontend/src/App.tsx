import './App.css'
import { AuthProvider } from './contexts/auth/AuthContext'
import GlobalProvider from './contexts/global/GlobalContext'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient.utils'
import AppRouter from './router/AppRouter'

function App() {
  return (
    <GlobalProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </AuthProvider>
    </GlobalProvider>
  )
}

export default App

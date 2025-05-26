import './App.css'
import { AuthProvider } from './contexts/auth/AuthContext'
import GlobalProvider from './contexts/global/GlobalContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppRouter from './router/AppRouter'

function App() {
  const queryClient = new QueryClient()

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

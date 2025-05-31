import AuthProvider from './contexts/auth/AuthContext'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient.utils'
import AppRouter from './router/AppRouter'
import useGlobal from './contexts/global/useGlobal'

const AppContent = () => {
  const { globalState } = useGlobal()
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default AppContent

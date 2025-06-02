import AuthProvider from './contexts/auth/AuthContext'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient.utils'
import AppRouter from './router/AppRouter'
import useGlobal from './contexts/global/useGlobal'
import Loading from './pages/Loading'

const AppContent = () => {
  const { globalState } = useGlobal()
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {globalState.loading ? <Loading /> : <AppRouter />}
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default AppContent

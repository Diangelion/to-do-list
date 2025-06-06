import { QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './contexts/auth/AuthContext'
import GlobalProvider from './contexts/global/GlobalContext'
import { queryClient } from './lib/queryClient.utils'
// import AppRouter from './router/AppRouter'
import Home from './pages/Home'

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <AuthProvider>
          {/* <AppRouter /> */}
          <Home />
        </AuthProvider>
      </GlobalProvider>
    </QueryClientProvider>
  )
}

export default App

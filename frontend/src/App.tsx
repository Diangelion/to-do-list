import { QueryClientProvider } from '@tanstack/react-query'
import GlobalProvider from './contexts/global/GlobalContext'
import { queryClient } from './lib/queryClient.utils'
import RouterApp from './router/RouterApp'

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <RouterApp />
      </GlobalProvider>
    </QueryClientProvider>
  )
}

export default App

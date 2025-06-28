import useAuth from '@/contexts/auth/useAuth'
import { Navigate } from 'react-router'

const RootRouter = () => {
  const { authState } = useAuth()
  return authState.isAuthenticated ? (
    <Navigate to='/home' replace />
  ) : (
    <Navigate to='/login' replace />
  )
}

export default RootRouter

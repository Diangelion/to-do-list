import { Navigate, Outlet } from 'react-router'
import useAuth from '@/contexts/auth/useAuth'

const ProtectedRouter = () => {
  const { authState } = useAuth()
  return authState.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  )
}

export default ProtectedRouter

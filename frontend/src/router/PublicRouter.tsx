import { Navigate, Outlet } from 'react-router'
import useAuth from '@/contexts/auth/useAuth'

const PublicRouter = () => {
  const { authState } = useAuth()
  return authState.isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Outlet />
  )
}

export default PublicRouter

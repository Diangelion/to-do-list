import { Navigate, Outlet } from 'react-router'
import useAuth from '@/contexts/auth/useAuth'

const PublicRouter = () => {
  const { authState } = useAuth()
  return authState.authenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Outlet />
  )
}

export default PublicRouter

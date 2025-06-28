import useAuth from '@/contexts/auth/useAuth'
import { Navigate, Outlet } from 'react-router'

const PublicRouter = ({ redirectPath = '/home' }) => {
  const { authState } = useAuth()
  if (authState.isAuthenticated) return <Navigate to={redirectPath} replace />
  return <Outlet />
}

export default PublicRouter

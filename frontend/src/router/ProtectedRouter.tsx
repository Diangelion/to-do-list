import useAuth from '@/contexts/auth/useAuth'
import { Navigate, Outlet } from 'react-router'

const ProtectedRouter = ({ redirectPath = '/login' }) => {
  const { authState } = useAuth()
  if (!authState.authenticated) return <Navigate to={redirectPath} replace />
  return <Outlet />
}

export default ProtectedRouter

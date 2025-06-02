import { Navigate, Outlet } from 'react-router'
import useAuth from '@/contexts/auth/useAuth'
import Loading from '@/pages/Loading'

const ProtectedRouter = ({ redirectPath = '/login' }) => {
  const { authState, isVerifying } = useAuth()
  if (isVerifying) return <Loading />
  if (!authState.authenticated) return <Navigate to={redirectPath} replace />
  return <Outlet />
}

export default ProtectedRouter

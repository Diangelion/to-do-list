import { Navigate } from 'react-router'
import useAuth from '@/contexts/auth/useAuth'
import Loading from '@/pages/Loading'

const RootRouter = () => {
  const { authState, isVerifying } = useAuth()
  if (isVerifying) return <Loading />
  return authState.authenticated ? (
    <Navigate to="/home" replace />
  ) : (
    <Navigate to="/login" replace />
  )
}

export default RootRouter

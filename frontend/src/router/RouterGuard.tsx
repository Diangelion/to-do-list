import useAuth from '@/contexts/auth/useAuth'
import useGlobal from '@/contexts/global/useGlobal'
import Loading from '@/pages/Loading'
import type { FC, ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'

interface RouteGuardProps {
  children?: ReactNode
  fallback?: ReactNode
  useOutlet?: boolean
  redirectPath?: string
}

export const RootRoute: FC<RouteGuardProps> = ({
  fallback = null,
  redirectPath = '/home'
}) => {
  const { authState } = useAuth()
  const { globalState } = useGlobal()
  const location = useLocation()

  if (globalState.loading) {
    return <Loading />
  }

  const targetPath = authState.authenticated
    ? location.state?.from || redirectPath
    : '/login'

  return (
    fallback || (
      <Navigate to={targetPath} replace state={{ from: location.pathname }} />
    )
  )
}

export const ProtectedRoute: FC<RouteGuardProps> = ({
  children = null,
  fallback = null,
  useOutlet = false,
  redirectPath = '/login'
}) => {
  const { authState } = useAuth()
  const { globalState } = useGlobal()
  const location = useLocation()

  if (globalState.loading) {
    return <Loading />
  }

  if (!authState.authenticated) {
    return (
      fallback || (
        <Navigate
          to={redirectPath}
          state={{ from: location.pathname }}
          replace
        />
      )
    )
  }

  return useOutlet ? <Outlet /> : <>{children}</>
}

export const PublicRoute: FC<RouteGuardProps> = ({
  children = null,
  fallback = null,
  useOutlet = false,
  redirectPath = '/home'
}) => {
  const { authState } = useAuth()
  const { globalState } = useGlobal()
  const location = useLocation()

  if (globalState.loading) {
    return <Loading />
  }

  if (authState.authenticated) {
    const from = location.state?.from || redirectPath
    return fallback || <Navigate to={from} replace />
  }

  return useOutlet ? <Outlet /> : <>{children}</>
}

export const SemiProtectedRoute: FC<RouteGuardProps> = ({
  children = null,
  useOutlet
}) => {
  const { globalState } = useGlobal()

  if (globalState.loading) {
    return <Loading />
  }

  return useOutlet ? <Outlet /> : <>{children}</>
}

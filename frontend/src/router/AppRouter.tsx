import { Routes, Route, Navigate } from 'react-router'
import { GoogleOAuthProvider } from '@react-oauth/google'
import useGlobal from '@/contexts/global/useGlobal'
import useAuth from '@/contexts/auth/useAuth'
import PublicRouter from './PublicRouter'
import ProtectedRouter from './ProtectedRouter'
import Login from '@/pages/Login'
import OAuth2 from '@/pages/OAuth2'

const AppRouter = () => {
  const { globalState } = useGlobal()
  const { authState } = useAuth()

  return (
    <GoogleOAuthProvider clientId={globalState.env.VITE_GOOGLE_CLIENT_ID || ''}>
      <Routes>
        {/* Root route */}
        <Route
          path="/"
          element={
            <Navigate
              to={authState.authenticated ? '/dashboard' : '/login'}
              replace
            />
          }
        />

        {/* Public routes */}
        <Route element={<PublicRouter />}>
          <Route path="/login" element={<Login />} />
          <Route path="/login/oauth2/code/:provider" element={<OAuth2 />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRouter />}>
          {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
        </Route>

        {/* Catch-all route */}
        {/* <Route path='*' element={<NotFoundPage />} /> */}
      </Routes>
    </GoogleOAuthProvider>
  )
}

export default AppRouter

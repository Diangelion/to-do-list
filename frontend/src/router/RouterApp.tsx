import AuthProvider from '@/contexts/auth/AuthContext'
import useGlobal from '@/contexts/global/useGlobal'
import ThemeProvider from '@/contexts/theme/ThemeContext'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import OAuth2 from '@/pages/OAuth2'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Route, Routes } from 'react-router'
import { ProtectedRoute, PublicRoute, RootRoute } from './RouterGuard'

const RouterApp = () => {
  const { globalState } = useGlobal()

  return (
    <GoogleOAuthProvider clientId={globalState.env.VITE_GOOGLE_CLIENT_ID || ''}>
      <AuthProvider>
        <ThemeProvider>
          <Routes>
            {/* Root route */}
            <Route path='/' element={<RootRoute />} />

            {/* Public routes */}
            <Route element={<PublicRoute useOutlet />}>
              <Route path='/login' element={<Login />} />
              <Route path='/login/oauth2/code/:provider' element={<OAuth2 />} />
            </Route>

            {/* Protected routes */}
            <Route element={<ProtectedRoute useOutlet />}>
              <Route path='/home' element={<Home />} />
              {/* <Route path="/profile" element={<ProfilePage />} /> */}
            </Route>

            {/* Catch-all route */}
            {/* <Route path='*' element={<NotFoundPage />} /> */}
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}

export default RouterApp

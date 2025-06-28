import useGlobal from '@/contexts/global/useGlobal'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import OAuth2 from '@/pages/OAuth2'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Route, Routes } from 'react-router'
import ProtectedRouter from './ProtectedRouter'
import PublicRouter from './PublicRouter'
import RootRouter from './RootRouter'

const AppRouter = () => {
  const { globalState } = useGlobal()

  return (
    <GoogleOAuthProvider clientId={globalState.env.VITE_GOOGLE_CLIENT_ID || ''}>
      <Routes>
        {/* Root route */}
        <Route path='/' element={<RootRouter />} />

        {/* Public routes */}
        <Route element={<PublicRouter />}>
          <Route path='/login' element={<Login />} />
          <Route path='/login/oauth2/code/:provider' element={<OAuth2 />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRouter />}>
          <Route path='/home' element={<Home />} />
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
        </Route>

        {/* Catch-all route */}
        {/* <Route path='*' element={<NotFoundPage />} /> */}
      </Routes>
    </GoogleOAuthProvider>
  )
}

export default AppRouter

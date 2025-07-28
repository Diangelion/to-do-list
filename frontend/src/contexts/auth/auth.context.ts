import { createContext } from 'react'
import type { AuthContextValue } from '../../types/auth.context.types'

export const initialContextValue: AuthContextValue = {
  authState: {
    authenticated: false
  },
  setAuthState: () => {
    throw new Error('setAuthState function must be implemented')
  },
  googleLogin: () => {
    throw new Error('googleLogin function must be implemented')
  },
  githubLogin: () => {
    throw new Error('githubLogin function must be implemented')
  },
  logout: () => {
    throw new Error('logout function must be implemented')
  }
}

export const AuthContext = createContext<AuthContextValue>(initialContextValue)

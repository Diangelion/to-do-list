import { createContext } from 'react'
import type { AuthContextValue } from './auth.context.types'

export const initialContextValue: AuthContextValue = {
  authState: {
    user: {},
    authenticated: false,
  },
  setAuthState: () => {},
  logout: async () => {},
  refreshAuth: () => {},
}

export const AuthContext = createContext<AuthContextValue>(initialContextValue)

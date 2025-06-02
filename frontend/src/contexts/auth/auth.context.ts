import { createContext } from 'react'
import type { AuthContextValue } from './auth.context.types'

export const initialContextValue: AuthContextValue = {
  authState: {
    user: null,
    authenticated: false,
  },
  setAuthState: () => {},
  isVerifying: false,
  logout: async () => {},
}

export const AuthContext = createContext<AuthContextValue>(initialContextValue)

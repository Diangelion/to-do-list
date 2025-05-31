import { createContext } from 'react'
import type { AuthContextValue } from './auth.context.types'

export const initialContextValue: AuthContextValue = {
  authState: {
    user: {},
    authenticated: false,
  },
  setAuthState: () => {},
}

export const AuthContext = createContext<AuthContextValue>(initialContextValue)

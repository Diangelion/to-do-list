import { createContext } from 'react'
import type { AuthContextValue } from '../../types/auth.context.types'

export const initialContextValue: AuthContextValue = {
  authState: {
    user: null,
    authenticated: false
  },
  setAuthState: () => {
    throw new Error('setAuthState function must be implemented')
  },
  isVerifying: false,
  logout: async () => Promise.resolve()
}

export const AuthContext = createContext<AuthContextValue>(initialContextValue)

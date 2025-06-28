import { createContext } from 'react'
import type { AuthContextValue } from '../../types/auth.context.types'

export const initialContextValue: AuthContextValue = {
  authState: {
    user: null,
    isAuthenticated: false
  },
  setAuthState: () => {
    throw new Error('setAuthState function must be implemented')
  }
}

export const AuthContext = createContext<AuthContextValue>(initialContextValue)

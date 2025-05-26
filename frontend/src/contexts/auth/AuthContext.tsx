import React, { createContext, useState } from 'react'
import type {
  AuthContextValue,
  AuthProviderProps,
  AuthState,
} from './auth.context.types'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: '',
    isAuthenticated: false,
  })

  const value = {
    authState,
    setAuthState,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
export { AuthProvider }

import type { ReactNode } from 'react'

export interface AuthState {
  user: string
  isAuthenticated: boolean
}

export interface AuthContextValue {
  authState: AuthState
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>
}

export interface AuthProviderProps {
  children: ReactNode
}

import type { ReactNode } from 'react'

export interface User {
  name: string
  email: string
  profile_picture: string
}

export interface AuthState {
  user: Partial<User>
  authenticated: boolean
}

export interface AuthContextValue {
  authState: AuthState
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>
  logout: () => Promise<void>
  refreshAuth: () => void
}

export interface AuthProviderProps {
  children: ReactNode
}

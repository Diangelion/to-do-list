import type { Dispatch, ReactNode, SetStateAction } from 'react'

export interface User {
  name: string
  email: string
  profile_picture: string
}

export interface AuthState {
  user: Partial<User> | null
  isAuthenticated: boolean
}

export interface AuthContextValue {
  authState: AuthState
  setAuthState: Dispatch<SetStateAction<AuthState>>
}

export interface AuthProviderProps {
  children: ReactNode
}

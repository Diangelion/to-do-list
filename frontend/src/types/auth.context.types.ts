import type { Dispatch, ReactNode, SetStateAction } from 'react'

export interface User {
  name: string
  email: string
  profile_picture: string
}

export interface AuthState {
  user: Partial<User> | null
  authenticated: boolean
}

export interface AuthContextValue {
  authState: AuthState
  setAuthState: Dispatch<SetStateAction<AuthState>>
  isVerifying: boolean
  logout: () => Promise<void>
}

export interface AuthProviderProps {
  children: ReactNode
}

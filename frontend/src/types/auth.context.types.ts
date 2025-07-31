import type { Dispatch, ReactNode, SetStateAction } from 'react'

export interface User {
  id: string
  name: string
  email: string
  profile_picture: string
}

export interface AuthState {
  token: string | null
  authenticated: boolean
}

export interface AuthContextValue {
  authState: AuthState
  setAuthState: Dispatch<SetStateAction<AuthState>>
  googleLogin: () => void
  githubLogin: () => void
  logout: () => void
}

export interface AuthProviderProps {
  children: ReactNode
}

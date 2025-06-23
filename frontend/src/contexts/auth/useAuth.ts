import { useContext } from 'react'
import type { AuthContextValue } from '../../types/auth.context.types'
import { AuthContext } from './auth.context'

const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext)
  return context
}

export default useAuth

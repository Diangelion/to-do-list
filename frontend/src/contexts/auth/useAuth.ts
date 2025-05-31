import { useContext } from 'react'
import { AuthContext } from './auth.context'
import type { AuthContextValue } from './auth.context.types'

const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext)
  return context
}

export default useAuth

import { useVerifyUser } from '@/services/auth.service'
import { tokenService } from '@/services/token.service'
import type { StoredItem } from '@/types/browser.storage.types'
import { type FC, useEffect, useMemo, useState } from 'react'
import type {
  AuthProviderProps,
  AuthState
} from '../../types/auth.context.types'
import useGlobal from '../global/useGlobal'
import { AuthContext, initialContextValue } from './auth.context'

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { setGlobalState } = useGlobal()
  const [authState, setAuthState] = useState<AuthState>(
    initialContextValue.authState
  )
  const [accessToken, setAccessToken] = useState<string | null>(null)

  useEffect(() => {
    const loadToken = async () => {
      const token: StoredItem | null = await tokenService.get()
      setAccessToken(token?.value || null)
    }
    void loadToken()
  }, [])

  const shouldFetch = !accessToken || tokenService.isExpired(accessToken)
  const { data, isLoading, isSuccess, isError } = useVerifyUser(
    { credentials: 'include' },
    { enabled: shouldFetch }
  )

  useEffect(() => {
    setGlobalState(prev => ({ ...prev, isLoading }))
  }, [isLoading, setGlobalState])

  useEffect(() => {
    const updateToken = async () => {
      if (isSuccess && data.status === 200) {
        setAuthState(prev => ({
          ...prev,
          user: data.data.data,
          isAuthenticated: true
        }))
      }
    }
    void updateToken()
  }, [isSuccess, data])
  console.log(isError)

  // useEffect(() => {
  //   if (isError && !isLoading) {
  //     setAuthState({
  //       isAuthenticated: false,
  //       user: null
  //     })
  //     tokenService.clear()
  //   }
  // }, [isError, isLoading])

  const contextValue = useMemo(
    () => ({
      authState,
      setAuthState
    }),
    [authState, setAuthState]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider

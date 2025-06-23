import { clearLocalForage } from '@/lib/localForage.utils'
import { useLogoutUser, useVerifyUser } from '@/services/authService'
import React, { useCallback, useEffect, useState } from 'react'
import type {
  AuthProviderProps,
  AuthState
} from '../../types/auth.context.types'
import useGlobal from '../global/useGlobal'
import { AuthContext, initialContextValue } from './auth.context'

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { globalState } = useGlobal()
  const [authState, setAuthState] = useState<AuthState>(
    initialContextValue.authState
  )

  const {
    data: userData,
    error: verifyError,
    isLoading: isVerifying,
    isSuccess: isVerificationSuccess,
    isError: isVerificationError
  } = useVerifyUser({ credentials: 'include' })

  useEffect(() => {
    if (isVerificationSuccess && userData?.data?.data) {
      setAuthState({
        user: userData.data.data,
        authenticated: true
      })
    } else if (isVerificationError || verifyError) {
      setAuthState({
        user: null,
        authenticated: false
      })
    }
  }, [
    userData,
    verifyError,
    isVerificationSuccess,
    isVerificationError,
    isVerifying
  ])

  const { mutateAsync: logoutUser } = useLogoutUser()

  const logout = useCallback(async () => {
    let serverLogoutSuccessful = false

    try {
      const response = await logoutUser(null)
      if (response.status === 200) {
        serverLogoutSuccessful = true
      } else {
        console.error(
          `Server logout failed with status: ${response.status}. Proceeding with local cleanup.`
        )
        // You might want to extract an error message from response.data or response.text()
        // For example: const errorData = await response.json(); console.error(errorData.message);
      }
    } catch (error) {
      console.error('Error during server logout API call:', error)
    }

    try {
      const tokenKey = globalState.env.VITE_LOCAL_FORAGE_ACCESS_TOKEN_KEY
      if (tokenKey) {
        const cleared = await clearLocalForage(tokenKey)
        if (!cleared) {
          console.warn(
            'Failed to clear token from localForage, but proceeding to update auth state.'
          )
        }
      } else {
        console.warn('Local forage token key is not defined. Skipping clear.')
      }
    } catch (error) {
      console.error('Error clearing local forage during logout:', error)
    }

    setAuthState({
      user: null,
      authenticated: false
    })

    if (!serverLogoutSuccessful) {
      console.warn(
        'Client-side logout complete, but server logout may have encountered issues.'
      )
    } else {
      console.log('Logout process fully completed.')
    }
  }, [
    logoutUser,
    globalState.env.VITE_LOCAL_FORAGE_ACCESS_TOKEN_KEY,
    setAuthState
  ])

  const contextValue = React.useMemo(
    () => ({
      authState,
      setAuthState,
      isVerifying,
      logout
    }),
    [authState, setAuthState, isVerifying, logout]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider

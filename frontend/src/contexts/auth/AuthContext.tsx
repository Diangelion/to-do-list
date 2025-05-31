import React, { useState, useEffect, useCallback } from 'react'
import type { AuthProviderProps, AuthState, User } from './auth.context.types'
import { initialContextValue, AuthContext } from './auth.context'
import { useVerifyUser } from '@/services/authService'
import { get } from '@/lib/localForage.utils'
import useGlobal from '../global/useGlobal'

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { globalState, setGlobalState } = useGlobal()
  const [authState, setAuthState] = useState<AuthState>(
    initialContextValue.authState
  )
  const [hasAttemptedVerification, setHasAttemptedVerification] =
    useState(false)

  const {
    data: userData,
    error: verifyError,
    isLoading: isVerifying,
    isSuccess: isVerificationSuccess,
    isError: isVerificationError,
    refetch: verifyUser,
  } = useVerifyUser()

  const attemptVerification = useCallback(async () => {
    try {
      const tokenKey = globalState.env.VITE_LOCAL_FORAGE_ACCESS_TOKEN_KEY
      if (!tokenKey) {
        throw new Error('Token key not configured')
      }

      const token = await get(tokenKey)
      if (token) {
        verifyUser()
      } else {
        setAuthState({
          authenticated: false,
          user: {},
        })
      }
    } catch (err) {
      setAuthState({
        authenticated: false,
        user: {},
      })
    } finally {
      setHasAttemptedVerification(true)
    }
  }, [globalState.env.VITE_LOCAL_FORAGE_ACCESS_TOKEN_KEY, verifyUser])

  useEffect(() => {
    if (
      !hasAttemptedVerification &&
      globalState.env.VITE_LOCAL_FORAGE_ACCESS_TOKEN_KEY &&
      !authState.authenticated
    ) {
      attemptVerification()
    }
  }, [
    hasAttemptedVerification,
    globalState.env.VITE_LOCAL_FORAGE_ACCESS_TOKEN_KEY,
    authState.authenticated,
    attemptVerification,
  ])

  useEffect(() => {
    if (isVerifying) {
      return setGlobalState(prev => ({ ...prev, loading: true }))
    }

    if (isVerificationSuccess && userData) {
      setAuthState({
        authenticated: true,
        user: userData.data?.data,
      })
    } else if (isVerificationError) {
      setAuthState({
        authenticated: false,
        user: {},
      })
    }
    setGlobalState(prev => ({ ...prev, loading: false }))
  }, [
    isVerifying,
    isVerificationSuccess,
    userData,
    isVerificationError,
    verifyError,
  ])

  const login = (user: User) => {
    setAuthState({
      authenticated: true,
      user,
    })
  }

  const logout = async () => {
    try {
      const tokenKey = globalState.env.VITE_LOCAL_FORAGE_ACCESS_TOKEN_KEY
      if (tokenKey) {
        // Clear token from storage
        // await clearLocalForage(tokenKey)
      }
      setAuthState({
        authenticated: false,
        user: {},
      })
      setHasAttemptedVerification(false)
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  const refreshAuth = useCallback(() => {
    setHasAttemptedVerification(false)
    attemptVerification()
  }, [attemptVerification])

  const value = {
    authState,
    setAuthState,
    login,
    logout,
    refreshAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider

import React, { useState, useEffect, useCallback } from 'react'
import type { AuthProviderProps, AuthState, User } from './auth.context.types'
import { initialContextValue, AuthContext } from './auth.context'
import { useLogoutUser, useVerifyUser } from '@/services/authService'
import { clearLocalForage, get } from '@/lib/localForage.utils'
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

  const { mutateAsync: logoutUser } = useLogoutUser()

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

  const logout = async () => {
    let serverLogoutSuccessful = false

    // 1. Attempt server-side logout
    try {
      const response = await logoutUser(null) // Assuming logoutUser takes null or relevant payload
      if (response.status === 200) {
        serverLogoutSuccessful = true
        console.log('Successfully logged out from server.')
      } else {
        // Server responded but not with success (e.g., 4xx, 5xx)
        console.error(
          `Server logout failed with status: ${response.status}. Proceeding with local cleanup.`
        )
        // You might want to extract an error message from response.data or response.text()
        // For example: const errorData = await response.json(); console.error(errorData.message);
      }
    } catch (apiError) {
      // Network error or other exception during the API call
      console.error('Error during server logout API call:', apiError)
      // Despite server logout failure, we will proceed to clear local state
      // and log the user out client-side.
    }

    // 2. Attempt to clear local storage
    // This should be done regardless of server logout success/failure to ensure client is clean.
    try {
      const tokenKey = globalState.env.VITE_LOCAL_FORAGE_ACCESS_TOKEN_KEY
      if (tokenKey) {
        // Assuming clearLocalForage returns true on success, false on failure, or throws.
        // If it returns a boolean:
        const cleared = await clearLocalForage(tokenKey)
        if (!cleared) {
          console.warn(
            'Failed to clear token from localForage, but proceeding to update auth state.'
          )
        }
        // If clearLocalForage throws on error, this try-catch will handle it.
      } else {
        console.warn('Local forage token key is not defined. Skipping clear.')
      }
    } catch (storageError) {
      console.error('Error clearing local forage during logout:', storageError)
      // Important: Don't let this error stop the UI state update.
    }

    // 3. ALWAYS update client-side authentication state
    // This is the most critical part for the UI to reflect a logged-out state.
    // This should happen even if server logout or local storage clearing failed.
    setAuthState({
      authenticated: false,
      user: {}, // Reset user data
    })
    setHasAttemptedVerification(false) // Reset verification attempt flag

    // 4. Post-logout actions / User Notifications
    if (!serverLogoutSuccessful) {
      // If the server logout wasn't definitively successful, notify the user.
      // This would typically involve calling a UI notification function (e.g., a toast message).
      console.warn(
        'Client-side logout complete, but server logout may have encountered issues.'
      )
      // Example: showUINotification("Your local session has been cleared, but there was an issue fully logging out from the server. Please check your connection or try again later.", "warning");
    } else {
      console.log('Logout process fully completed.')
      // Example: showUINotification("Successfully logged out.", "success");
    }

    // You might also want to redirect the user to a login page or homepage.
    // router.push('/login');
  }

  const refreshAuth = useCallback(() => {
    setHasAttemptedVerification(false)
    attemptVerification()
  }, [attemptVerification])

  const value = {
    authState,
    setAuthState,
    logout,
    refreshAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider

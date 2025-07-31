import {
  useGetUser,
  useLogoutUser,
  useRefreshUser
} from '@/services/auth.service'
import { tokenService } from '@/services/token.service'
// import { useGetUserProfile } from '@/services/user.service'
import { useGoogleLogin } from '@react-oauth/google'
import { type FC, useCallback, useEffect, useMemo, useState } from 'react'
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

  // Load token on mount
  useEffect(() => {
    setGlobalState(prev => ({ ...prev, loading: true }))

    const loadToken = async () => {
      const token = await tokenService.get()
      setAuthState(prev => ({ ...prev, token }))
    }
    void loadToken()

    const registerForceLogout = async () => {
      await tokenService.clear()
      setAuthState({ token: null, authenticated: false })
      setGlobalState(prev => ({ ...prev, user: null }))
    }
    tokenService.setForceLogout(registerForceLogout)
  }, [setGlobalState])

  // Verify token if available and not expired
  const isTokenReady = authState.token !== null
  const isTokenPresent = !!authState.token
  const isTokenValid = authState.token
    ? !tokenService.expired(authState.token)
    : false

  const shouldVerify = isTokenReady && isTokenPresent && isTokenValid

  const {
    data: verifyData,
    isSuccess: isVerifySuccess,
    isLoading: isVerifying
  } = useRefreshUser({ credentials: 'include' }, { enabled: shouldVerify })

  // Fetch user profile only if verification passed
  const {
    data: profileData,
    isSuccess: isProfileSuccess,
    isLoading: isFetchingUser
  } = useGetUser({ credentials: 'include' }, { enabled: isVerifySuccess })

  // Update auth state if verified
  useEffect(() => {
    if (isVerifySuccess && verifyData?.status === 200) {
      setAuthState(prev => ({ ...prev, authenticated: true }))
    }
  }, [isVerifySuccess, verifyData])

  // Store user profile and handle finish loading
  useEffect(() => {
    const loadingDone =
      (!isVerifying && !shouldVerify) || (isVerifySuccess && !isFetchingUser)

    if (loadingDone) {
      const user =
        isProfileSuccess && profileData.data.data ? profileData.data.data : null
      setGlobalState(prev => ({ ...prev, loading: false, user }))
    }
  }, [
    isVerifying,
    isFetchingUser,
    isVerifySuccess,
    isProfileSuccess,
    setGlobalState,
    shouldVerify,
    profileData?.data.data
  ])

  const googleLogin = useGoogleLogin({
    onError: err => console.error(`useGoogleLogin | ${err}`),
    ux_mode: 'redirect',
    redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI || '',
    flow: 'auth-code',
    select_account: true
  })

  const githubLogin = useCallback(() => {
    const githubClientId = import.meta.env.VITE_GITHUB_CLIENT_ID || ''
    const githubRedirectURI = import.meta.env.VITE_GITHUB_REDIRECT_URI || ''
    const baseGithubOauth = import.meta.env.VITE_GITHUB_BASE_URL || ''
    window.location.href = `${baseGithubOauth}?client_id=${githubClientId}&redirect_uri=${githubRedirectURI}&scope=read:user,user:email&prompt=consent`
  }, [])

  const { mutateAsync: logoutUser } = useLogoutUser({ credentials: 'include' })

  const logout = useCallback(async (): Promise<void> => {
    try {
      await logoutUser(null)
      await tokenService.clear()
      setAuthState({ token: null, authenticated: false })
      setGlobalState(prev => ({ ...prev, user: null }))
    } catch (error) {
      console.error('logout | Logout failed:', error)
    }
  }, [logoutUser, setGlobalState])

  const contextValue = useMemo(
    () => ({
      authState,
      setAuthState,
      googleLogin,
      githubLogin,
      logout
    }),
    [authState, setAuthState, googleLogin, githubLogin, logout]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider

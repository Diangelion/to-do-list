import { useLogoutUser, useVerifyUser } from '@/services/auth.service'
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

  const [accessToken, setAccessToken] = useState<string | null | undefined>(
    undefined
  )
  const [authState, setAuthState] = useState<AuthState>(
    initialContextValue.authState
  )

  // Load token on mount
  useEffect(() => {
    setGlobalState(prev => ({ ...prev, loading: true }))

    const loadToken = async () => {
      const token = await tokenService.get()
      setAccessToken(token)
    }
    void loadToken()
  }, [setGlobalState])

  // Verify token if available and not expired
  const isTokenReady = accessToken !== undefined
  const isTokenPresent = !!accessToken
  const isTokenValid = accessToken ? !tokenService.expired(accessToken) : false

  const shouldVerify = isTokenReady && isTokenPresent && isTokenValid

  const {
    data: verifyData,
    isSuccess: isVerifySuccess
    // isLoading: isVerifying
  } = useVerifyUser({ credentials: 'include' }, { enabled: shouldVerify })

  // // Fetch user profile only if verification passed
  // const {
  //   data: userProfile,
  //   isSuccess: isProfileSuccess,
  //   isLoading: isFetchingUser
  // } = useGetUserProfile(isVerifySuccess)

  // Update auth state if verified
  useEffect(() => {
    if (isVerifySuccess && verifyData?.status === 200) {
      setAuthState({ authenticated: true })
    }
  }, [isVerifySuccess, verifyData])

  // // Store user profile and finish loading
  // useEffect(() => {
  //   const loadingDone =
  //     (!isVerifying && !shouldVerify) || // no token or invalid
  //     (isVerifySuccess && !isFetchingUser) // token valid → user fetched or errored

  //   if (loadingDone) {
  //     setGlobalState(prev => ({
  //       ...prev,
  //       isLoading: false,
  //       user: isProfileSuccess && userProfile ? userProfile : null
  //     }))
  //   }
  // }, [
  //   isVerifying,
  //   isFetchingUser,
  //   isVerifySuccess,
  //   isProfileSuccess,
  //   userProfile,
  //   setGlobalState,
  //   shouldVerify
  // ])

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
      setAuthState({ authenticated: false })
      setGlobalState(prev => ({ ...prev, user: null }))
    } catch (error) {
      console.error('Logout failed:', error)
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

import { post } from '@/api/client'
import type { LoginResponse } from '@/types/auth.api.types'
import type { DecodedAuthToken, TokenService } from '@/types/token.types'
import { jwtDecode } from 'jwt-decode'
import { indexedDBStorage } from './browser.storage.services'

export const tokenService: TokenService = {
  // Variables
  accessTokenKey: import.meta.env.VITE_LOCAL_FORAGE_ACCESS_TOKEN_KEY,
  fetchOptions: { credentials: 'include' },
  pendingRefresh: null,
  storage: indexedDBStorage,
  forceLogout: null,

  // Functions
  set: (token: string) =>
    tokenService.storage.set(tokenService.accessTokenKey, token),
  get: async () => await tokenService.storage.get(tokenService.accessTokenKey),
  remove: (token: string) => tokenService.storage.remove(token),
  clear: () => tokenService.storage.remove(tokenService.accessTokenKey),
  expired: (token: string): boolean => {
    const decodedToken: DecodedAuthToken = tokenService.decode(token)
    if (!decodedToken) return true

    // Add 30-second buffer to handle clock skew
    const currentTime = Math.floor(Date.now() / 1000)
    return decodedToken.exp < currentTime + 30
  },
  refresh: async (): Promise<string | null> => {
    try {
      const response = await post<LoginResponse>(
        '/user/refresh',
        null,
        tokenService.fetchOptions
      )

      // Handle error
      if (response.status !== 200) throw new Error('Refresh failed')

      // Get token and handle if empty
      const newToken = response.data.data.token
      if (!newToken) throw new Error('No token in response')

      // Renew token
      await tokenService.set(newToken)
      return newToken
    } catch (error) {
      await tokenService.clear()
      throw error
    }
  },
  fresh: async (): Promise<string | null> => {
    // Get existing
    const storedToken = await tokenService.get()
    if (!storedToken) return null

    // Check if still valid
    if (!tokenService.expired(storedToken)) return storedToken

    // Handle expiration token
    if (!tokenService.pendingRefresh) {
      tokenService.pendingRefresh = tokenService.refresh().finally(() => {
        tokenService.pendingRefresh = null
      })
    }

    return await tokenService.pendingRefresh
  },
  decode: (token: string): DecodedAuthToken => jwtDecode(token),
  tokenInfo: (
    token: string
  ): Pick<DecodedAuthToken, 'sub' | 'email'> | null => {
    const decoded = tokenService.decode(token)
    if (!decoded) return null

    return {
      sub: decoded.sub,
      email: decoded.email
    }
  },
  setForceLogout: (callback: () => void) => {
    tokenService.forceLogout = callback
  }
}

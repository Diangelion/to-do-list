import type { StorageService } from './browser.storage.types'

export interface TokenService {
  // Variables
  accessTokenKey: string
  fetchOptions: { credentials: RequestCredentials }
  pendingRefresh: Promise<string | null> | null
  storage: StorageService

  // Methods
  set: (token: string) => Promise<boolean>
  get: () => Promise<string | null>
  remove: (token: string) => Promise<boolean>
  clear: () => Promise<boolean>
  expired: (token: string) => boolean
  refresh: () => Promise<string | null>
  fresh: () => Promise<string | null>
  decode: (token: string) => DecodedAuthToken
  tokenInfo: (token: string) => Pick<DecodedAuthToken, 'sub' | 'email'> | null
}

export interface DecodedAuthToken {
  sub: string
  email: string
  exp: number
  iat: number
  jti?: string
}

export interface StoredItem {
  value: string
  expiresAt?: number
}

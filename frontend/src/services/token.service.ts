import { refreshAccessToken } from '@/api/client'
import { clear, get, store } from '@/lib/localForage.utils'
import type { StoredItem } from '@/types/browser.storage.types'
import CryptoJS from 'crypto-js'
import { jwtDecode } from 'jwt-decode'

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY
const ACCESS_TOKEN_KEY = import.meta.env.VITE_LOCAL_FORAGE_ACCESS_TOKEN_KEY

const encrypt = (token: string) =>
  CryptoJS.AES.encrypt(token, ENCRYPTION_KEY).toString()

const decrypt = (cipher: string) =>
  CryptoJS.AES.decrypt(cipher, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8)

let refreshInProgress = false
let pendingRefresh: Promise<string | null> | null = null

export const tokenService = {
  async set(token: string) {
    const encrypted = encrypt(token)
    await store(ACCESS_TOKEN_KEY, encrypted)
  },

  async get(): Promise<StoredItem | null> {
    const token: StoredItem | null = await get(ACCESS_TOKEN_KEY)
    return token ? { ...token, value: decrypt(token.value) } : null
  },

  async clear() {
    await clear(ACCESS_TOKEN_KEY)
  },

  isExpired(token: string): boolean {
    const { exp }: { exp: number } = jwtDecode(token)
    const now = Math.floor(Date.now() / 1000)
    return exp < now
  },

  expiringSoon(token: string, bufferSeconds = 30): boolean {
    const { exp }: { exp: number } = jwtDecode(token)
    const now = Math.floor(Date.now() / 1000)
    return exp - now < bufferSeconds
  },

  async ensureFreshToken(): Promise<string | null> {
    const stored = await tokenService.get()
    const isExpired = stored && tokenService.isExpired(stored.value)

    if (!stored || !stored.value || isExpired) {
      if (refreshInProgress && pendingRefresh) {
        return pendingRefresh
      }

      refreshInProgress = true
      pendingRefresh = refreshAccessToken()

      const newToken = await pendingRefresh
      refreshInProgress = false
      pendingRefresh = null

      return newToken
    }

    return stored.value
  }
}

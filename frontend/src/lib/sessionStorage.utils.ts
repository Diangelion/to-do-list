// import type { StoredItem } from '@/types/token.types'
// import { timeConversions } from './utils'

// export const store = (key: string, value: string, ttl?: number) => {
//   const data: StoredItem = { value }
//   if (ttl) data.expiresAt = Date.now() + ttl
//   sessionStorage.setItem(key, JSON.stringify(data))
// }

// export const storeWithExpiration = (
//   key: string,
//   value: string,
//   days: number = 0,
//   hours: number = 0,
//   minutes: number = 0
// ) => {
//   const ttlMilliseconds = timeConversions.toTTL(days, hours, minutes) * 1000
//   return store(key, value, ttlMilliseconds)
// }

// export const get = (key: string, now?: number): string | null => {
//   const item = JSON.parse(sessionStorage.getItem(key) || '')
//   if (!item) return null
//   const currentTime = now !== undefined ? now : Date.now()
//   if (item.expiresAt && currentTime > item.expiresAt) {
//     clear(key)
//     return null
//   }
//   return item.value
// }

// export const getWithExpiration = (key: string): string | null => {
//   return get(key, Date.now())
// }

// export const clear = (key: string) => {
//   sessionStorage.removeItem(key)
// }

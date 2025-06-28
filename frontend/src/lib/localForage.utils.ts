import type { StoredItem } from '@/types/browser.storage.types'
import localforage from 'localforage'
import { timeConversions } from './utils'

localforage.config({
  driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
  name: 'to-do-list',
  storeName: 'auth',
  description: 'Storage for application authentication data.'
})

export const store = async (
  key: string,
  value: string,
  ttl?: number
): Promise<void> => {
  const data: StoredItem = { value }
  if (ttl) data.expiresAt = Date.now() + ttl
  await localforage.setItem(key, data)
}

export const storeWithExpiration = async (
  key: string,
  value: string,
  days: number = 0,
  hours: number = 0,
  minutes: number = 0
): Promise<void> => {
  const ttlMilliseconds = timeConversions.toTTL(days, hours, minutes) * 1000
  return store(key, value, ttlMilliseconds)
}

export const get = async (
  key: string,
  now?: number
): Promise<StoredItem | null> => {
  const item: StoredItem | null = await localforage.getItem(key)
  const currentTime = now !== undefined ? now : Date.now()
  if (item?.expiresAt && currentTime > item?.expiresAt) {
    await clear(key)
    return null
  }
  return item
}

export const getWithExpiration = async (
  key: string
): Promise<StoredItem | null> => {
  return get(key, Date.now())
}

export const clear = async (key: string): Promise<void> => {
  await localforage.removeItem(key)
}

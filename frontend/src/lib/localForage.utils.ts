import localforage from 'localforage'
import { timeConversions } from './global.utils'

localforage.config({
  driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
  name: 'to-do-list',
  storeName: 'auth',
  description: 'Storage for application authentication data.',
})

interface StoredItem {
  value: string
  expiresAt?: number
}

export const store = async (key: string, token: string, ttl?: number) => {
  if (!token) return

  try {
    const item: StoredItem = {
      value: token,
      ...(ttl ? { expiresAt: Date.now() + ttl } : {}),
    }
    await localforage.setItem(key, item)
  } catch (error) {
    console.error('Error storing access token:', error)
  }
}

export const storeWithExpiration = async (
  key: string,
  value: string,
  days: number = 0,
  hours: number = 0,
  minutes: number = 0
) => {
  const ttlMilliseconds = timeConversions.toTTL(days, hours, minutes) * 1000
  console.log(days, hours, minutes)
  await store(key, value, ttlMilliseconds)
}

export const get = async (
  key: string,
  now?: number
): Promise<string | null> => {
  try {
    const item: StoredItem | null = await localforage.getItem(key)

    if (!item) return null

    if (item.expiresAt && now && now > item.expiresAt) {
      await localforage.removeItem(key)
      return null
    }

    return item.value
  } catch (error) {
    return null
  }
}

export const getWithExpiration = async (
  key: string
): Promise<string | null> => {
  return get(key, Date.now())
}

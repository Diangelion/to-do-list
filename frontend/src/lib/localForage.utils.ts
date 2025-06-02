import localforage from 'localforage'
import { timeConversions } from './global.utils' // Assuming this utility is correctly defined

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

export const store = async (
  key: string,
  token: string,
  ttl?: number
): Promise<boolean> => {
  if (!token) {
    throw new Error('No token provided to store.')
  }

  const item: StoredItem = {
    value: token,
    ...(ttl ? { expiresAt: Date.now() + ttl } : {}),
  }

  try {
    await localforage.setItem(key, item)
    return true
  } catch (error) {
    console.error('Error storing item in localForage:', error)
    throw error
  }
}

export const storeWithExpiration = async (
  key: string,
  value: string,
  days: number = 0,
  hours: number = 0,
  minutes: number = 0
): Promise<boolean> => {
  const ttlMilliseconds = timeConversions.toTTL(days, hours, minutes) * 1000
  return store(key, value, ttlMilliseconds)
}

export const get = async (
  key: string,
  now?: number
): Promise<string | null> => {
  try {
    const item: StoredItem | null = await localforage.getItem(key)

    if (!item) {
      return null
    }

    const currentTime = now !== undefined ? now : Date.now()

    if (item.expiresAt && currentTime > item.expiresAt) {
      await clearLocalForage(key)
      return null
    }

    return item.value
  } catch (error) {
    console.error('Error retrieving item from localForage:', error)
    throw error
  }
}

export const getWithExpiration = async (
  key: string
): Promise<string | null> => {
  return get(key, Date.now())
}

export const clearLocalForage = async (key: string): Promise<boolean> => {
  try {
    await localforage.removeItem(key)
    return true
  } catch (error) {
    console.error('Error clearing localForage item:', error)
    throw error
  }
}

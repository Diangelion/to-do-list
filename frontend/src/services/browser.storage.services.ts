import todoListConfig from '@/config/todo-list.config'
import type { StorageService } from '@/types/browser.storage.types'
import Cookies from 'js-cookie'
import localforage from 'localforage'

// localforage configuration
localforage.config(todoListConfig.LOCAL_FORAGE)

// Cookie Storage Service
export const cookieStorage: StorageService = {
  set: async (key, value, options = {}) => {
    try {
      Cookies.set(key, JSON.stringify(value), options)
      return true
    } catch (error) {
      console.error('Cookie set error:', error)
      return false
    }
  },
  get: async key => {
    try {
      const value = Cookies.get(key)
      return value ? JSON.parse(value) : null
    } catch (error) {
      console.error('Cookie get error:', error)
      return null
    }
  },
  remove: async key => {
    try {
      Cookies.remove(key)
      return true
    } catch (error) {
      console.error('Cookie remove error:', error)
      return false
    }
  },
  clear: async () => {
    try {
      const allCookies = Cookies.get()
      Object.keys(allCookies).forEach(cookie => Cookies.remove(cookie))
      return true
    } catch (error) {
      console.error('Cookie clear error:', error)
      return false
    }
  }
}

// Local Storage Service
export const localStorage: StorageService = {
  set: async (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('LocalStorage set error:', error)
      return false
    }
  },
  get: async key => {
    try {
      const value = window.localStorage.getItem(key)
      return value ? JSON.parse(value) : null
    } catch (error) {
      console.error('LocalStorage get error:', error)
      return null
    }
  },
  remove: async key => {
    try {
      window.localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('LocalStorage remove error:', error)
      return false
    }
  },
  clear: async () => {
    try {
      window.localStorage.clear()
      return true
    } catch (error) {
      console.error('LocalStorage clear error:', error)
      return false
    }
  }
}

// Session Storage Service
export const sessionStorage: StorageService = {
  set: async (key, value) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('SessionStorage set error:', error)
      return false
    }
  },
  get: async key => {
    try {
      const value = window.sessionStorage.getItem(key)
      return value ? JSON.parse(value) : null
    } catch (error) {
      console.error('SessionStorage get error:', error)
      return null
    }
  },
  remove: async key => {
    try {
      window.sessionStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('SessionStorage remove error:', error)
      return false
    }
  },
  clear: async () => {
    try {
      window.sessionStorage.clear()
      return true
    } catch (error) {
      console.error('SessionStorage clear error:', error)
      return false
    }
  }
}

// IndexedDB Storage Service (using localforage)
export const indexedDBStorage: StorageService = {
  set: async (key, value) => {
    try {
      await localforage.setItem(key, value)
      return true
    } catch (error) {
      console.error('IndexedDB set error:', error)
      return false
    }
  },
  get: async key => {
    try {
      return await localforage.getItem(key)
    } catch (error) {
      console.error('IndexedDB get error:', error)
      return null
    }
  },
  remove: async key => {
    try {
      await localforage.removeItem(key)
      return true
    } catch (error) {
      console.error('IndexedDB remove error:', error)
      return false
    }
  },
  clear: async () => {
    try {
      await localforage.clear()
      return true
    } catch (error) {
      console.error('IndexedDB clear error:', error)
      return false
    }
  }
}

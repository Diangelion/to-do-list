import React, { useState } from 'react'
import { GlobalContext, initialContextValue } from './global.context'
import type { GlobalState } from './global.context.types'

const initializeEnv = (): ImportMetaEnv => {
  const getEnvVar = (
    key: keyof ImportMetaEnv,
    defaultValue?: string
  ): string => {
    const value = import.meta.env[key]
    if (value === undefined) {
      if (defaultValue !== undefined) return defaultValue
      throw new Error(`Missing environment variable: ${String(key)}`)
    }
    return String(value)
  }

  const getEnvNumber = (
    key: keyof ImportMetaEnv,
    defaultValue?: number
  ): number => {
    const value = import.meta.env[key]
    if (value === undefined) {
      if (defaultValue !== undefined) return defaultValue
      throw new Error(`Missing environment variable: ${String(key)}`)
    }
    const num = parseInt(String(value), 10)
    if (isNaN(num)) {
      if (defaultValue !== undefined) return defaultValue
      throw new Error(
        `Invalid number for environment variable ${String(key)}: ${value}`
      )
    }
    return num
  }

  const BASE_URL = import.meta.env.BASE_URL
  const MODE = import.meta.env.MODE
  const DEV = import.meta.env.DEV
  const PROD = import.meta.env.PROD
  const SSR = import.meta.env.SSR

  return {
    BASE_URL,
    MODE,
    DEV,
    PROD,
    SSR,
    VITE_BASE_URL_API: getEnvVar('VITE_BASE_URL_API'),
    VITE_GOOGLE_CLIENT_ID: getEnvVar('VITE_GOOGLE_CLIENT_ID'),
    VITE_GOOGLE_REDIRECT_URI: getEnvVar('VITE_GOOGLE_REDIRECT_URI'),
    VITE_GITHUB_BASE_URL: getEnvVar('VITE_GITHUB_BASE_URL'),
    VITE_GITHUB_CLIENT_ID: getEnvVar('VITE_GITHUB_CLIENT_ID'),
    VITE_GITHUB_CALLBACK_URL: getEnvVar('VITE_GITHUB_CALLBACK_URL'),
    VITE_FACEBOOK_APP_ID: getEnvVar('VITE_FACEBOOK_APP_ID'),
    VITE_LOCAL_FORAGE_ACCESS_TOKEN_KEY: getEnvVar(
      'VITE_LOCAL_FORAGE_ACCESS_TOKEN_KEY'
    ),
    VITE_LOCAL_FORAGE_ACCESS_EXPIRATION_TIME_MINUTES: getEnvNumber(
      'VITE_LOCAL_FORAGE_ACCESS_EXPIRATION_TIME_MINUTES'
    ),
  }
}

let initializedEnv: ImportMetaEnv
try {
  initializedEnv = initializeEnv()
} catch (error) {
  console.error('initializeEnv() | Environment configuration error: ', error)
  throw error
}

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [globalState, setGlobalState] = useState<GlobalState>({
    ...initialContextValue.globalState,
    env: initializedEnv,
  })

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider

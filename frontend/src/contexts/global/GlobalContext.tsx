import { useMemo, useState, type FC, type ReactNode } from 'react'
import type { GlobalState } from '../../types/global.context.types'
import { GlobalContext, initialContextValue } from './global.context'

// eslint-disable-next-line no-undef
const initializeEnv = (): ImportMetaEnv => {
  const getEnvVar = (
    // eslint-disable-next-line no-undef
    key: keyof ImportMetaEnv,
    defaultValue?: string
  ): string => {
    const value = import.meta.env[String(key)]
    if (value === undefined) {
      if (defaultValue !== undefined) return defaultValue
      throw new Error(`Missing environment variable: ${String(key)}`)
    }
    return String(value)
  }

  return {
    VITE_BASE_URL_API: getEnvVar('VITE_BASE_URL_API'),
    VITE_GOOGLE_CLIENT_ID: getEnvVar('VITE_GOOGLE_CLIENT_ID'),
    VITE_GOOGLE_REDIRECT_URI: getEnvVar('VITE_GOOGLE_REDIRECT_URI'),
    VITE_GITHUB_BASE_URL: getEnvVar('VITE_GITHUB_BASE_URL'),
    VITE_GITHUB_CLIENT_ID: getEnvVar('VITE_GITHUB_CLIENT_ID'),
    VITE_GITHUB_REDIRECT_URI: getEnvVar('VITE_GITHUB_REDIRECT_URI'),
    VITE_FACEBOOK_APP_ID: getEnvVar('VITE_FACEBOOK_APP_ID'),
    VITE_LOCAL_FORAGE_ACCESS_TOKEN_KEY: getEnvVar(
      'VITE_LOCAL_FORAGE_ACCESS_TOKEN_KEY'
    ),
    VITE_LOCAL_STORAGE_THEME_KEY: getEnvVar('VITE_LOCAL_STORAGE_THEME_KEY'),

    BASE_URL: getEnvVar('BASE_URL', '/'),
    MODE: getEnvVar('MODE', 'development'),
    DEV: import.meta.env.DEV,
    PROD: import.meta.env.PROD,
    SSR: import.meta.env.SSR
  }
}

// eslint-disable-next-line no-undef
let initializedEnv: ImportMetaEnv
try {
  initializedEnv = initializeEnv()
} catch (error) {
  console.error('initializeEnv() | Environment configuration error: ', error)
  throw error
}

const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [globalState, setGlobalState] = useState<GlobalState>({
    ...initialContextValue.globalState,
    env: initializedEnv
  })

  const contextValue = useMemo(
    () => ({ globalState, setGlobalState }),
    [globalState, setGlobalState]
  )

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider

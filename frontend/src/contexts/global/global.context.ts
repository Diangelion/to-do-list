import { createContext } from 'react'
import type { GlobalContextValue } from './global.context.types'

export const initialContextValue: GlobalContextValue = {
  globalState: {
    env: {
      BASE_URL: '',
      MODE: '',
      DEV: false,
      PROD: false,
      SSR: false,
      VITE_BASE_URL_API: '',
      VITE_GOOGLE_CLIENT_ID: '',
      VITE_FACEBOOK_APP_ID: '',
    },
    pageLoading: false,
  },
  setGlobalState: () => console.warn('Context not ready'),
}

export const GlobalContext =
  createContext<GlobalContextValue>(initialContextValue)

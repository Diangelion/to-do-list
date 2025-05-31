import { createContext } from 'react'
import type { GlobalContextValue } from './global.context.types'

export const initialContextValue: GlobalContextValue = {
  globalState: {
    env: {},
    loading: false,
  },
  setGlobalState: () => {},
}

export const GlobalContext =
  createContext<GlobalContextValue>(initialContextValue)

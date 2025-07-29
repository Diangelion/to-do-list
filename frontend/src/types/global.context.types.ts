import type { Dispatch, ReactNode, SetStateAction } from 'react'
import type { User } from './auth.context.types'

export interface GlobalState {
  // eslint-disable-next-line no-undef
  env: Partial<ImportMetaEnv>
  loading: boolean
  user: User | null
}

export interface GlobalContextValue {
  globalState: GlobalState
  setGlobalState: Dispatch<SetStateAction<GlobalState>>
}

export interface GlobalProviderProps {
  children: ReactNode
}

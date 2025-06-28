import type { Dispatch, ReactNode, SetStateAction } from 'react'

export interface GlobalState {
  // eslint-disable-next-line no-undef
  env: Partial<ImportMetaEnv>
  isLoading: boolean
}

export interface GlobalContextValue {
  globalState: GlobalState
  setGlobalState: Dispatch<SetStateAction<GlobalState>>
}

export interface GlobalProviderProps {
  children: ReactNode
}

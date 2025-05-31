import { useContext } from 'react'
import { GlobalContext } from './global.context'
import type { GlobalContextValue } from './global.context.types'

const useGlobal = (): GlobalContextValue => {
  const context = useContext(GlobalContext)
  return context
}

export default useGlobal

import { useContext } from 'react'
import type { GlobalContextValue } from '../../types/global.context.types'
import { GlobalContext } from './global.context'

const useGlobal = (): GlobalContextValue => {
  const context = useContext(GlobalContext)
  return context
}

export default useGlobal

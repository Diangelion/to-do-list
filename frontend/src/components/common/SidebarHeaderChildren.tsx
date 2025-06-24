import { Search } from 'lucide-react'
import { SidebarTrigger } from '../ui/sidebar'
import NewDateDialog from './NewDateDialog'

const SidebarHeaderChildren = () => {
  return (
    <div className='flex h-full flex-col justify-around'>
      <div className='flex items-center justify-between px-2'>
        <SidebarTrigger className='hover-behaviour h-[2rem] w-[2rem] cursor-pointer rounded-full' />
        <div
          className='hover-behaviour flex h-[2rem] w-[2rem] items-center justify-center rounded-full'
          title='Search'
        >
          <Search width={16} height={16} />
        </div>
      </div>
      <NewDateDialog />
    </div>
  )
}

export default SidebarHeaderChildren

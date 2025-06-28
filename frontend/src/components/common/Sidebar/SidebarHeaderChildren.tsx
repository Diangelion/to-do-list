import { SidebarTrigger } from '@/components/ui/sidebar'
import { Search } from 'lucide-react'
import NewDateDialog from './NewDateDialog'

const SidebarHeaderChildren = () => {
  return (
    <div className='flex h-full flex-col justify-around'>
      <div className='flex items-center justify-between px-2'>
        <SidebarTrigger className='hover-behaviour text-secondary-foreground hover:!text-secondary-foreground h-[2rem] w-[2rem] rounded-full' />
        <div
          className='hover-behaviour flex h-[2rem] w-[2rem] items-center justify-center rounded-full'
          title='Search'
        >
          <Search
            width={16}
            height={16}
            className='text-secondary-foreground'
          />
        </div>
      </div>
      <NewDateDialog />
    </div>
  )
}

export default SidebarHeaderChildren

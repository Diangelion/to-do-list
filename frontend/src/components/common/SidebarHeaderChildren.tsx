import { CirclePlus, Search } from 'lucide-react'
import { SidebarTrigger } from '../ui/sidebar'

const SidebarHeaderChildren = () => {
  return (
    <div className='flex h-full flex-col justify-around'>
      <div className='flex items-center justify-between px-2'>
        <div
          className='hover-behavior flex h-[2rem] w-[2rem] items-center justify-center rounded-full'
          title='Toggle Sidebar'
        >
          <SidebarTrigger className='cursor-pointer' size='lg' />
        </div>
        <div
          className='hover-behavior flex h-[2rem] w-[2rem] items-center justify-center rounded-full'
          title='Search'
        >
          <Search width={16} height={16} />
        </div>
      </div>
      <div
        className='hover-behavior w-full rounded-xl'
        title='Create New Todos'
      >
        <div className='flex items-center gap-x-3 px-5 py-2'>
          <CirclePlus width={20} height={20} />{' '}
          <p className='text-sm'>New Todos</p>
        </div>
      </div>
    </div>
  )
}

export default SidebarHeaderChildren

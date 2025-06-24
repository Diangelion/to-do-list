import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'

const SidebarFooterChildren = () => {
  return (
    <HoverCard>
      <HoverCardTrigger
        className='hover-behaviour flex h-full items-center gap-x-5 rounded-sm px-2'
        title='Profile'
      >
        <img
          className='h-[2rem] rounded-full'
          src='https://placehold.co/300?text=B'
          alt='Profile'
        />
        <p>John Doe</p>
      </HoverCardTrigger>
      <HoverCardContent className='shadow-behavior mx-auto flex h-[30dvh] w-fit flex-col items-center justify-center gap-y-2 border-none p-2 text-center opacity-85'>
        <div className='mx-auto h-1/2 w-auto'>
          <img
            className='h-full w-full rounded-full'
            src='https://placehold.co/300?text=B'
            alt='Profile'
          />
        </div>
        <p>bryanrichie92@gmail.com</p>
        <p>Joined at Januari 2023</p>
      </HoverCardContent>
    </HoverCard>
  )
}

export default SidebarFooterChildren

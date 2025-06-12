import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'

const SidebarFooterChildren = () => {
  return (
    <HoverCard>
      <HoverCardTrigger
        className='hover-behavior flex aspect-square h-full items-center gap-x-5 rounded-sm p-1 px-2'
        title='Profile'
      >
        <img
          className='aspect-square h-3/4 rounded-full'
          src='https://placehold.co/300?text=B'
          alt='Profile'
        />
        <p>John Doe</p>
      </HoverCardTrigger>
      <HoverCardContent className='shadow-behavior mx-auto flex h-[30dvh] w-fit flex-col items-center justify-center gap-y-2 border-none bg-white p-2 text-center opacity-85 dark:bg-black'>
        <div className='mx-auto aspect-square h-1/2 w-auto'>
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

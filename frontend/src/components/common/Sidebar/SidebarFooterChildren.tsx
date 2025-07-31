import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import useGlobal from '@/contexts/global/useGlobal'

const SidebarFooterChildren = () => {
  const { globalState } = useGlobal()

  return (
    <HoverCard>
      <HoverCardTrigger
        className='hover-behaviour flex h-full items-center gap-x-5 rounded-sm px-2'
        title='Profile'
      >
        <img
          className='h-[2rem] rounded-full border-1'
          src={globalState.user?.profile_picture}
          alt='Profile'
        />
        <p>{globalState.user?.name}</p>
      </HoverCardTrigger>
      <HoverCardContent className='shadow-behavior mx-auto flex h-[30dvh] w-fit flex-col items-center justify-center gap-y-2 border-none p-2 text-center opacity-85'>
        <div className='mx-auto h-1/2 w-auto'>
          <img
            className='h-full w-full rounded-full border-1'
            src={globalState.user?.profile_picture}
            alt='Profile'
          />
        </div>
        <p>{globalState.user?.email}</p>
      </HoverCardContent>
    </HoverCard>
  )
}

export default SidebarFooterChildren

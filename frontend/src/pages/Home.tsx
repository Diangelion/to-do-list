import AppSidebar from '@/components/common/AppSidebar'
import HomeTabs from '@/components/common/HomeTabs'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import TodoProvider from '@/contexts/todo/TodoContext'

const Home = () => {
  return (
    <TodoProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className='h-[100dvh] p-4 md:mx-auto md:w-[80dvw]'>
          <SidebarTrigger className='hover-behaviour rounded-full' />
          <HomeTabs />
        </main>
      </SidebarProvider>
    </TodoProvider>
  )
}

export default Home

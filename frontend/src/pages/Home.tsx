import AppSidebar from '@/components/common/AppSidebar'
import HomeTabs from '@/components/common/HomeTabs'
import ThemeToggler from '@/components/common/ThemeToggler'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import TodoProvider from '@/contexts/todo/TodoContext'

const Home = () => {
  return (
    <TodoProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className='h-[100dvh] p-4 md:mx-auto md:w-[80dvw]'>
          <div className='flex justify-between'>
            <SidebarTrigger className='hover-behaviour rounded-full' />
            <ThemeToggler />
          </div>
          <HomeTabs />
        </main>
      </SidebarProvider>
    </TodoProvider>
  )
}

export default Home

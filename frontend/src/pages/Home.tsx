import HomeTabs from '@/components/common/Home/HomeTabs'
import AppSidebar from '@/components/common/Sidebar/AppSidebar'
import ThemeToggler from '@/components/common/Theme/ThemeToggler'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import TodoProvider from '@/contexts/todo/TodoContext'

const Home = () => {
  return (
    <TodoProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className='bg-background h-[100dvh] p-4 md:mx-auto md:w-[80dvw]'>
          <div className='flex h-[3rem] items-center justify-between'>
            <SidebarTrigger
              className='hover-behaviour h-[2rem] w-[2rem] rounded-full'
              title='Sidebar Button'
            />
            <ThemeToggler />
          </div>
          <HomeTabs />
        </main>
      </SidebarProvider>
    </TodoProvider>
  )
}

export default Home

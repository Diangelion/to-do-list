import HomeTabs from '@/components/common/Home/HomeTabs'
import AppSidebar from '@/components/common/Sidebar/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import TodoProvider from '@/contexts/todo/TodoContext'

const Home = () => {
  return (
    <TodoProvider>
      <SidebarProvider className='bg-primary'>
        <AppSidebar />
        <main className='h-[100dvh] p-4 md:mx-auto md:w-[80dvw]'>
          <div className='flex h-[3rem] items-center justify-between'>
            <SidebarTrigger className='hover-behaviour text-primary-foreground hover:!text-primary-foreground rounded-full' />
            {/* <ThemeToggler /> */}
          </div>
          <HomeTabs />
        </main>
      </SidebarProvider>
    </TodoProvider>
  )
}

export default Home

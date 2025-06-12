import AppSidebar from '@/components/common/AppSidebar'
import HomeTabs from '@/components/common/HomeTabs'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

const Home = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full p-4'>
        <SidebarTrigger />
        <HomeTabs />
      </main>
    </SidebarProvider>
  )
}

export default Home

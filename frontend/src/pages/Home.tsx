import AppSidebar from '@/components/common/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

const Home = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  )
}

export default Home

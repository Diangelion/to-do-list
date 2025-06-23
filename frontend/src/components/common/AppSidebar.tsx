import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader
} from '@/components/ui/sidebar'
import SidebarContentChildren from './SidebarContentChildren'
import SidebarFooterChildren from './SidebarFooterChildren'
import SidebarHeaderChildren from './SidebarHeaderChildren'

const AppSidebar = () => {
  return (
    <Sidebar className='py-8'>
      <SidebarHeader className='h-[20%]'>
        <SidebarHeaderChildren />
      </SidebarHeader>
      <SidebarContent className='h-[70%]'>
        <SidebarContentChildren />
      </SidebarContent>
      <SidebarFooter className='h-[10%]'>
        <SidebarFooterChildren />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar

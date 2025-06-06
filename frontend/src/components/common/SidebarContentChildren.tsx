import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { Calendar } from 'lucide-react'

const SidebarContentChildren = () => {
  // Menu items.
  const items = [
    {
      title: 'Home',
      url: '#',
      icon: Calendar
    },
    {
      title: 'Inbox',
      url: '#',
      icon: Calendar
    },
    {
      title: 'Calendar',
      url: '#',
      icon: Calendar
    },
    {
      title: 'Search',
      url: '#',
      icon: Calendar
    },
    {
      title: 'Settings',
      url: '#',
      icon: Calendar
    },
    {
      title: 'Settings',
      url: '#',
      icon: Calendar
    },
    {
      title: 'Settings',
      url: '#',
      icon: Calendar
    },
    {
      title: 'Settings',
      url: '#',
      icon: Calendar
    },
    {
      title: 'Settings',
      url: '#',
      icon: Calendar
    },
    {
      title: 'Settings',
      url: '#',
      icon: Calendar
    },
    {
      title: 'Settings',
      url: '#',
      icon: Calendar
    },
    {
      title: 'Settings',
      url: '#',
      icon: Calendar
    },
    {
      title: 'Settings',
      url: '#',
      icon: Calendar
    },
    {
      title: 'Settings',
      url: '#',
      icon: Calendar
    },
    {
      title: 'Settings',
      url: '#',
      icon: Calendar
    },
    {
      title: 'Settings',
      url: '#',
      icon: Calendar
    },
    {
      title: 'Settings',
      url: '#',
      icon: Calendar
    },
    {
      title: 'Settings',
      url: '#',
      icon: Calendar
    },
    {
      title: 'Settings',
      url: '#',
      icon: Calendar
    },
    {
      title: 'Settings',
      url: '#',
      icon: Calendar
    },
    {
      title: 'Settings',
      url: '#',
      icon: Calendar
    },
    {
      title: 'Settings',
      url: '#',
      icon: Calendar
    },
    {
      title: 'Settings',
      url: '#',
      icon: Calendar
    },
    {
      title: 'Settings',
      url: '#',
      icon: Calendar
    }
  ]
  return (
    <SidebarGroup className='custom-scrollbar h-full overflow-y-auto'>
      <SidebarGroupLabel className='text-md'>Todos</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(item => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export default SidebarContentChildren

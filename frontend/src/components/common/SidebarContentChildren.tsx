import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { Calendar } from 'lucide-react'
import { Fragment } from 'react'

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
    <SidebarGroup>
      <SidebarGroupLabel className='text-md'>Todos</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <ScrollArea className='shadow-inset-b-sm h-[20rem] whitespace-nowrap'>
            {items.map((item, i) => (
              <Fragment key={`Date.now()-${item.title}-${i}`}>
                <SidebarMenuItem className='hover-behaviour rounded-sm'>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <Separator className='my-1' />
              </Fragment>
            ))}
          </ScrollArea>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export default SidebarContentChildren

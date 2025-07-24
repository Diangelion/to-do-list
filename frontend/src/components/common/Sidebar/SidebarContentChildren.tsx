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
import useTodo from '@/contexts/todo/useTodo'
import { cn } from '@/lib/utils'
import { Calendar } from 'lucide-react'
import { Fragment } from 'react'

const SidebarContentChildren = () => {
  const { todoState, setTodoState } = useTodo()

  const items = [
    {
      title: '24-06-2025',
      url: '#',
      icon: Calendar
    },
    {
      title: '23-06-2025',
      url: '#',
      icon: Calendar
    },
    {
      title: '22-06-2025',
      url: '#',
      icon: Calendar
    },
    {
      title: '21-06-2025',
      url: '#',
      icon: Calendar
    },
    {
      title: '21-06-2025',
      url: '#',
      icon: Calendar
    },
    {
      title: '21-06-2025',
      url: '#',
      icon: Calendar
    },
    {
      title: '21-06-2025',
      url: '#',
      icon: Calendar
    },
    {
      title: '21-06-2025',
      url: '#',
      icon: Calendar
    },
    {
      title: '21-06-2025',
      url: '#',
      icon: Calendar
    },
    {
      title: '21-06-2025',
      url: '#',
      icon: Calendar
    },
    {
      title: '21-06-2025',
      url: '#',
      icon: Calendar
    },
    {
      title: '21-06-2025',
      url: '#',
      icon: Calendar
    },
    {
      title: '21-06-2025',
      url: '#',
      icon: Calendar
    }
  ]

  return (
    <SidebarGroup>
      <SidebarGroupLabel className='text-md'>Todos</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <ScrollArea className='h-[19rem] whitespace-nowrap'>
            {items.map((item, i) => (
              <Fragment key={`${item.title}-${i}`}>
                <SidebarMenuItem
                  className={cn(
                    'hover-behaviour rounded-sm',
                    item.title === todoState.selectedDate && 'bg-hover'
                  )}
                  onClick={() =>
                    setTodoState(prev => ({
                      ...prev,
                      selectedDate: item.title
                    }))
                  }
                >
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

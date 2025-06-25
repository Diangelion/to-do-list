import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import type { TodoItem } from '@/types/todo.items.types'
import { Trash2 } from 'lucide-react'
import { Separator } from '../ui/separator'

const HomeTabsContentChildrent = ({ todo }: { todo: TodoItem }) => {
  return (
    <Card className='card-todo'>
      <CardHeader>
        <CardTitle>{todo.title}</CardTitle>
        <Separator className='bg-accent mt-2' />
      </CardHeader>
      <CardContent className='flex h-full flex-col justify-between'>
        <CardDescription className='line-clamp-4'>
          {todo.description}
        </CardDescription>
        <CardAction className='self-end'>
          <div className='hover-behaviour flex h-8 w-8 items-center justify-center rounded-full'>
            <Trash2
              width={16}
              height={16}
              className='text-primary-foreground'
            />
          </div>
        </CardAction>
      </CardContent>
    </Card>
  )
}

export default HomeTabsContentChildrent

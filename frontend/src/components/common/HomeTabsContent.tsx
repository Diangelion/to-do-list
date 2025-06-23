import useTodo from '@/contexts/todo/useTodo'
import type { TodoItem } from '@/types/todo.items.types'
import { TabsContent } from '@radix-ui/react-tabs'
import { ScrollArea } from '../ui/scroll-area'
import HomeTabsContentChildrent from './HomeTabsContentChildren'

const HomeTabsContent = ({ chosenTab }: { chosenTab: string }) => {
  const { todoState } = useTodo()

  if (todoState.todoItem[chosenTab].length === 0) {
    return (
      <>
        <div>Loading woi</div>
        <div>Loading woi</div>
        <div>Loading woi</div>
        <div>Loading woi</div>
        <div>Loading woi</div>
        <div>Loading woi</div>
      </>
    )
  }

  return (
    <TabsContent value={chosenTab} key={`${chosenTab}`}>
      <ScrollArea className='shadow-inset-b-sm h-[80dvh]'>
        <div className='flex w-full flex-wrap gap-y-5 py-2'>
          {todoState.todoItem[chosenTab].map((todo: TodoItem, i) => (
            <HomeTabsContentChildrent key={i} todo={todo} />
          ))}
        </div>
      </ScrollArea>
    </TabsContent>
  )
}

export default HomeTabsContent

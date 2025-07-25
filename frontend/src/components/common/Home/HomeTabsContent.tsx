import { ScrollArea } from '@/components/ui/scroll-area'
import useTodo from '@/contexts/todo/useTodo'
import Loading from '@/pages/Loading'
import type { HomeTabsContentProps } from '@/types/tabs.types'
import type { TodoItem } from '@/types/todo.items.types'
import { TabsContent } from '@radix-ui/react-tabs'
import NewToDoDialog from '../Sidebar/NewToDoDialog'
import HomeTabsContentChildrent from './HomeTabsContentChildren'

const HomeTabsContent = ({ chosenTab }: HomeTabsContentProps) => {
  const { todoState } = useTodo()
  const todos = todoState.todoItem[chosenTab]

  const isEmpty = !todos || todos.length === 0

  return (
    <TabsContent value={chosenTab} key={chosenTab}>
      {isEmpty ? (
        <Loading height='h-[80dvh]' />
      ) : (
        <ScrollArea className='h-[calc(85dvh-4rem)]'>
          <div className='flex w-full flex-wrap gap-y-5 py-2'>
            {todos.map((todo: TodoItem, i: number) => (
              <HomeTabsContentChildrent key={i} todo={todo} />
            ))}
          </div>
        </ScrollArea>
      )}
      <NewToDoDialog />
    </TabsContent>
  )
}

export default HomeTabsContent

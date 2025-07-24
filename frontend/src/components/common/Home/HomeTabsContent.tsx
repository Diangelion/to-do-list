import { ScrollArea } from '@/components/ui/scroll-area'
import useTodo from '@/contexts/todo/useTodo'
import Loading from '@/pages/Loading'
import type { HomeTabsContentProps } from '@/types/tabs.types'
import type { TodoItem } from '@/types/todo.items.types'
import { TabsContent } from '@radix-ui/react-tabs'
import { Plus } from 'lucide-react'
import HomeTabsContentChildrent from './HomeTabsContentChildren'

const HomeTabsContent = ({ chosenTab }: HomeTabsContentProps) => {
  const { todoState } = useTodo()
  const todos = todoState.todoItem[chosenTab]

  const isEmpty = !todos || todos.length === 0

  return (
    <TabsContent value={chosenTab} key={chosenTab} className='relative'>
      {isEmpty ? (
        <Loading height='h-[80dvh]' />
      ) : (
        <>
          <ScrollArea className='h-[calc(85dvh-4rem)]'>
            <div className='flex w-full flex-wrap gap-y-5 py-2'>
              {todos.map((todo: TodoItem, i: number) => (
                <HomeTabsContentChildrent key={i} todo={todo} />
              ))}
            </div>
          </ScrollArea>
          <div
            title={`Add new ${chosenTab.toLocaleLowerCase()}`}
            className='hover-behaviour bg-accent absolute right-[2rem] bottom-[2rem] flex h-[3rem] w-[3rem] items-center justify-center rounded-full sm:bottom-0'
          >
            <Plus />
          </div>
        </>
      )}
    </TabsContent>
  )
}

export default HomeTabsContent

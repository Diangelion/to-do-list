import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import todoListConfig from '@/config/todo-list.config'
import { useState } from 'react'
import HomeTabsContent from './HomeTabsContent'

const HomeTabs = () => {
  const [chosenTab, setChosenTab] = useState<string>(
    todoListConfig.TAB_CHOICES[0]?.value
  )

  return (
    <Tabs
      defaultValue={chosenTab}
      onValueChange={tab => setChosenTab(tab)}
      className='h-[calc(100dvh-4rem)] flex-col-reverse overflow-hidden sm:flex-col'
    >
      <TabsList className='mx-auto flex h-[3rem] w-full justify-center gap-x-2'>
        {todoListConfig.TAB_CHOICES.map(({ value, label }, i) => (
          <TabsTrigger
            key={`${value}-${i}`}
            value={value}
            className='text-md cursor-pointer'
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      <HomeTabsContent chosenTab={chosenTab} />
    </Tabs>
  )
}

export default HomeTabs

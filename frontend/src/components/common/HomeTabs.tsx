import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { tabChoices } from '@/lib/constant'
import { useState } from 'react'
import HomeTabsContent from './HomeTabsContent'

const HomeTabs = () => {
  const [chosenTab, setChosenTab] = useState<string>(tabChoices[0]?.value)

  return (
    <Tabs
      defaultValue={chosenTab}
      onValueChange={tab => setChosenTab(tab)}
      className='h-[calc(100dvh-4rem)] flex-col-reverse overflow-hidden sm:flex-col'
    >
      <TabsList className='mx-auto flex h-[3rem] w-full justify-center gap-x-2'>
        {tabChoices.map(({ value, label }, i) => (
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

import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { tabChoices } from '@/lib/constant'
import { useState } from 'react'
import HomeTabsContent from './HomeTabsContent'

const HomeTabs = () => {
  const [chosenTab, setChosenTab] = useState<string>(tabChoices[0]?.value)

  return (
    <Tabs defaultValue={chosenTab} onValueChange={tab => setChosenTab(tab)}>
      <TabsList className='mx-auto flex h-[3rem] w-full justify-center gap-x-2'>
        {tabChoices.map(({ value, label }, i) => (
          <TabsTrigger
            key={`${value}-${i}`}
            value={value}
            className={`hover-behaviour text-md ${chosenTab === value ? 'bg-gray-300/20' : ''}`}
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      <Separator className='bg-black dark:bg-white' />
      <HomeTabsContent chosenTab={chosenTab} />
    </Tabs>
  )
}

export default HomeTabs

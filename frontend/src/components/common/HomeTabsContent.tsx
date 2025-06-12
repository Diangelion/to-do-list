import { TabsContent } from '@radix-ui/react-tabs'
import { ScrollArea } from '../ui/scroll-area'
import HomeTabsContentChildrent from './HomeTabsContentChildren'

const HomeTabsContent = ({ chosenTab }: { chosenTab: string }) => {
  const hehe = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <ScrollArea className='shadow-inset-b-sm h-[75dvh]'>
      <TabsContent
        value={chosenTab}
        key={`${chosenTab}`}
        className='flex w-full flex-wrap justify-around gap-y-5 p-2'
      >
        {hehe.map(a => (
          <HomeTabsContentChildrent a={a} />
        ))}
      </TabsContent>
    </ScrollArea>
  )
}

export default HomeTabsContent

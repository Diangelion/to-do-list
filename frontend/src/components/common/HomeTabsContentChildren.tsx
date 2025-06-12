import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Trash2 } from 'lucide-react'
import { Separator } from '../ui/separator'

const HomeTabsContentChildrent = ({ a }: { a: number }) => {
  console.log(a)
  return (
    <Card className='h-[15rem] w-[30%]'>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <Separator className='mt-2 bg-white' />
      </CardHeader>
      <CardContent className='flex h-full flex-col justify-between'>
        <CardDescription className='line-clamp-4'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          cupiditate laudantium iste, autem perferendis exercitationem maiores
          consectetur maxime debitis corporis eum doloribus repellendus quas
          fugit ipsum rem ratione optio ut?
        </CardDescription>
        <CardAction className='self-end'>
          <Trash2 width={16} height={16} color='red' />
        </CardAction>
      </CardContent>
    </Card>
  )
}

export default HomeTabsContentChildrent

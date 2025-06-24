import type { LoadingProps } from '@/types/loading.types'
import { BeatLoader } from 'react-spinners'

const Loading = ({
  width = 'w-full',
  height = 'h-screen',
  color = '#36d7b7',
  size = 15
}: LoadingProps) => {
  return (
    <div className={`flex items-center justify-center ${width} ${height}`}>
      <div className='text-center'>
        <BeatLoader color={color} size={size} speedMultiplier={1} />
        <h1>Loading, please wait...</h1>
      </div>
    </div>
  )
}

export default Loading

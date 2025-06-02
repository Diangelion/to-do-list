import { BeatLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="text-center">
        <BeatLoader color="#36d7b7" size={15} speedMultiplier={1} />
        <h1>Loading, please wait...</h1>
      </div>
    </div>
  )
}

export default Loading

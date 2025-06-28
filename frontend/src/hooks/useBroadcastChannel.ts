// import { useEffect, useState } from 'react'

// const useBroadcastChannel = (channelName: any, onMessage: any) => {
//   const [channel, setChannel] = useState<BroadcastChannel | null>(null)

//   useEffect(() => {
//     const bc = new BroadcastChannel(channelName)
//     setChannel(bc)

//     bc.onmessage = event => {
//       onMessage(event.data)
//     }

//     return () => {
//       bc.close()
//     }
//   }, [channelName, onMessage])

//   const postMessage = (message: any) => {
//     if (channel) {
//       channel.postMessage(message)
//     }
//   }

//   return { postMessage }
// }

// export default useBroadcastChannel

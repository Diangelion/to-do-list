import { propagateLoaderColor, propagateTypingSequence } from '@/lib/constant'
import { PropagateLoader } from 'react-spinners'
import { TypeAnimation } from 'react-type-animation'
import { useSearchParams, useParams } from 'react-router'
import { useEffect } from 'react'
import { useCreateUser } from '@/services/authService'

const OAuth2 = () => {
  const [searchParams] = useSearchParams()
  const { provider } = useParams()
  const { mutate } = useCreateUser()

  useEffect(() => {
    console.log(`Provider: ${provider}`)
    const code: string = searchParams.get('code') || ''
    if (code) mutate({ token: code })
  }, [searchParams])

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-y-10">
      <TypeAnimation
        preRenderFirstString={true}
        sequence={propagateTypingSequence}
        wrapper="h1"
        cursor={true}
        repeat={Infinity}
      />
      <PropagateLoader
        color={propagateLoaderColor}
        // loading={loading}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default OAuth2

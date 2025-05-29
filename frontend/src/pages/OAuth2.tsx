import { propagateLoaderColor, propagateTypingSequence } from '@/lib/constant'
import { PropagateLoader } from 'react-spinners'
import { TypeAnimation } from 'react-type-animation'
import { useSearchParams, useParams, useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useCreateUser } from '@/services/authService'

const OAuth2 = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { provider = '' } = useParams()
  const { mutate } = useCreateUser()

  useEffect(() => {
    const error: string = searchParams.get('error') || ''
    if (error) navigate('/')
    const code: string = searchParams.get('code') || ''
    if (code) mutate({ token: code, provider })
  }, [])

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

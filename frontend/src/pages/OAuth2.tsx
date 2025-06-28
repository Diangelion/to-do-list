import { propagateLoaderColor, propagateTypingSequence } from '@/lib/constant'
import { useCreateUser } from '@/services/auth.service'
import { tokenService } from '@/services/token.service'
import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import { PropagateLoader } from 'react-spinners'
import { TypeAnimation } from 'react-type-animation'

const OAuth2 = () => {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')

  const { provider } = useParams()

  const { mutate: createUserLogin } = useCreateUser(undefined, {
    onSuccess: async loginResponse => {
      if (loginResponse.status === 200) {
        await tokenService
          .set(loginResponse.data.data.access_token)
          .then(() => void navigate('/home'))
          .catch(() => void navigate('/'))
      }
      return void navigate('/')
    },
    onError: () => void navigate('/')
  })

  useEffect(() => {
    if (!provider || !code) return void navigate('/')
    createUserLogin({ token: code, provider })
  }, [code, provider, navigate, createUserLogin])

  return (
    <div className='OAuth2_Page flex h-screen w-full flex-col items-center justify-center gap-y-10'>
      <TypeAnimation
        preRenderFirstString
        sequence={propagateTypingSequence}
        wrapper='h1'
        cursor
        repeat={Infinity}
      />
      <PropagateLoader
        color={propagateLoaderColor}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  )
}

export default OAuth2

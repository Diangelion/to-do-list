import useGlobal from '@/contexts/global/useGlobal'
import { propagateLoaderColor, propagateTypingSequence } from '@/lib/constant'
import { storeWithExpiration } from '@/lib/localForage.utils'
import { useCreateUser } from '@/services/authService'
import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import { PropagateLoader } from 'react-spinners'
import { TypeAnimation } from 'react-type-animation'

const OAuth2 = () => {
  const { globalState } = useGlobal()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { provider = '' } = useParams()

  const code = searchParams.get('code')
  const tokenKey = globalState.env.VITE_LOCAL_FORAGE_ACCESS_TOKEN_KEY
  const expirationTime =
    globalState.env.VITE_LOCAL_FORAGE_ACCESS_EXPIRATION_TIME_MINUTES

  const { mutate: createUserLogin } = useCreateUser(undefined, {
    onSuccess: async loginResponse => {
      if (loginResponse.status === 200) {
        await storeWithExpiration(
          tokenKey || '',
          loginResponse.data?.data?.access_token,
          0,
          0,
          expirationTime
        )
          .then(() => {
            void navigate('/home')
          })
          .catch(() => {
            void navigate('/')
          })
      }
    },
    onError: () => {
      void navigate('/')
    }
  })

  useEffect(() => {
    if (!code || !tokenKey || !expirationTime || !provider) {
      void navigate('/')
      return
    }

    createUserLogin({ token: code, provider })
  }, [code, tokenKey, expirationTime, provider, navigate, createUserLogin])

  return (
    <div className='flex flex-col items-center justify-center w-full h-screen gap-y-10'>
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

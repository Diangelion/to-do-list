import { useEffect } from 'react'
import { PropagateLoader } from 'react-spinners'
import { TypeAnimation } from 'react-type-animation'
import { useSearchParams, useParams, useNavigate } from 'react-router'
import { propagateLoaderColor, propagateTypingSequence } from '@/lib/constant'
import useGlobal from '@/contexts/global/useGlobal'
import { useCreateUser } from '@/services/authService'
import { storeWithExpiration } from '@/lib/localForage.utils'

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
          tokenKey!,
          loginResponse.data?.data?.access_token,
          0,
          0,
          expirationTime!
        )
        navigate('/home')
      }
    },
    onError: () => {
      navigate('/')
    },
  })

  useEffect(() => {
    if (!code || !tokenKey || !expirationTime || !provider) {
      navigate('/')
      return
    }

    createUserLogin({ token: code, provider })
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
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default OAuth2

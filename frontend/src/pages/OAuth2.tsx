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
  const { mutateAsync: createUserLogin } = useCreateUser()

  useEffect(() => {
    const code = searchParams.get('code')
    const handleLogin = async () => {
      try {
        if (code && provider) {
          const loginResponse = await createUserLogin({ token: code, provider })
          if (!(loginResponse.status === 200))
            throw new Error(
              `Login error with status code: ${loginResponse.status}`
            )
          await storeWithExpiration(
            globalState.env.VITE_LOCAL_FORAGE_ACCESS_TOKEN_KEY,
            loginResponse.data?.data?.access_token,
            0,
            0,
            globalState.env.VITE_LOCAL_FORAGE_ACCESS_EXPIRATION_TIME_MINUTES
          )
          return navigate('/dashboard')
        }
        throw new Error('Login oauth error or not reachable.')
      } catch (error) {
        return navigate('/')
      }
    }

    handleLogin()
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

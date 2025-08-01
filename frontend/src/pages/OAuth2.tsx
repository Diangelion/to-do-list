import todoListConfig from '@/config/todo-list.config'
import useAuth from '@/contexts/auth/useAuth'
import useTheme from '@/contexts/theme/useTheme'
import { useCreateUser } from '@/services/auth.service'
import { tokenService } from '@/services/token.service'
import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import { PropagateLoader } from 'react-spinners'
import { TypeAnimation } from 'react-type-animation'

const OAuth2 = () => {
  const { themeState } = useTheme()
  const { setAuthState } = useAuth()
  const propagateLoaderColor =
    themeState.theme === 'light'
      ? todoListConfig.PROPAGATE_LOADER_COLOR_LIGHT
      : todoListConfig.PROPAGATE_LOADER_COLOR_DARK
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')

  const { provider } = useParams<{ provider: 'google' | 'github' }>()

  const { mutate: createUserLogin } = useCreateUser(undefined, {
    onSuccess: async loginResponse => {
      if (loginResponse.status === 200) {
        const { token } = loginResponse.data.data
        await tokenService.set(token)
        setAuthState(prev => ({ ...prev, token }))
        void navigate('/home')
      } else {
        void navigate('/')
      }
    },
    onError: () => void navigate('/')
  })

  useEffect(() => {
    if (!provider || !code) {
      void navigate('/')
      return
    }
    createUserLogin({ token: code, provider })
  }, [code, provider, navigate, createUserLogin])

  return (
    <div className='bg-background flex h-[100dvh] w-[100dvw] flex-col items-center justify-center gap-y-10'>
      <span className='text-4xl font-bold'>
        <TypeAnimation
          preRenderFirstString
          sequence={todoListConfig.PROPAGATE_TYPING_SEQUENCE}
          wrapper='h1'
          repeat={Infinity}
          omitDeletionAnimation
        />
      </span>
      <PropagateLoader
        color={propagateLoaderColor}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  )
}

export default OAuth2

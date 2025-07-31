import { Button } from '@/components/ui/button'
import todoListConfig from '@/config/todo-list.config'
import { TypeAnimation } from 'react-type-animation'

import GitHubIcon from '@/assets/icons8-github.svg'
import GoogleIcon from '@/assets/icons8-google.svg'
import useAuth from '@/contexts/auth/useAuth'

const Login = () => {
  const { googleLogin, githubLogin } = useAuth()

  return (
    <div className='bg-background flex h-[100dvh] w-[100dvw] items-center justify-center overflow-hidden'>
      <div className='bg-primary h-fit w-[100dvw] rounded-sm p-10 sm:w-[75dvw] lg:w-[50dvw]'>
        <div className='text-center'>
          <span className='text-4xl font-bold'>
            <TypeAnimation
              cursor
              sequence={todoListConfig.LOGIN_TYPING_SEQUENCE}
              wrapper='h1'
              repeat={Infinity}
              deletionSpeed={10}
            />
          </span>
          <p>Organize your todos from anywhere and anytime with to-do-list.</p>
        </div>
        <hr className='mx-auto my-6 border-t-8' />
        <div className='text-center'>
          <h2>Sign in with</h2>
          <div className='mt-2 flex justify-center gap-x-2'>
            <Button
              onClick={() => googleLogin()}
              variant='secondary'
              className='hover-behaviour'
            >
              <img src={GoogleIcon} alt='Google Icon' width={20} />
              Google
            </Button>
            <Button
              onClick={githubLogin}
              variant='secondary'
              className='hover-behaviour'
            >
              <img src={GitHubIcon} alt='GitHub Icon' width={20} />
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

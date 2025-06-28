import { Button } from '@/components/ui/button'
import useGlobal from '@/contexts/global/useGlobal'
import { loginTypingSequence } from '@/lib/constant'
import { useGoogleLogin } from '@react-oauth/google'
import { TypeAnimation } from 'react-type-animation'

import GitHubIcon from '@/assets/icons8-github.svg'
import GoogleIcon from '@/assets/icons8-google.svg'

const Login = () => {
  const { globalState } = useGlobal()

  const login = useGoogleLogin({
    onError: err => console.log(`useGoogleLogin | ${err}`),
    ux_mode: 'redirect',
    redirect_uri: globalState.env.VITE_GOOGLE_REDIRECT_URI || '',
    flow: 'auth-code',
    select_account: true
  })

  const useGithubLogin = () => {
    const githubClientId = globalState.env.VITE_GITHUB_CLIENT_ID || ''
    const githubRedirectURI = globalState.env.VITE_GITHUB_REDIRECT_URI || ''
    const baseGithubOauth = globalState.env.VITE_GITHUB_BASE_URL || ''
    window.location.href = `${baseGithubOauth}?client_id=${githubClientId}&redirect_uri=${githubRedirectURI}&scope=read:user,user:email&prompt=consent`
  }

  return (
    <div className='Login__Page flex h-[100dvh] w-full items-center justify-center'>
      <div className='Login__Page__Container h-[50dvh] w-3/4 p-10'>
        <div className='Login_Page__Header text-center'>
          <TypeAnimation
            cursor
            sequence={loginTypingSequence}
            wrapper='h1'
            repeat={Infinity}
            deletionSpeed={10}
          />
          <p>Organize your todos from anywhere and anytime with to-do-list.</p>
        </div>
        <hr className='mx-auto my-6 border-t-8' />
        <div className='Login__Page__Form text-center'>
          <h2>Sign in with</h2>
          <div className='Login__Page__Option mt-6 flex justify-center gap-x-2'>
            <Button onClick={() => login()}>
              <img src={GoogleIcon} alt='Google Icon' width={20} />
              Google
            </Button>
            <Button onClick={useGithubLogin}>
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

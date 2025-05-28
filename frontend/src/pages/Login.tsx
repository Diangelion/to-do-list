import { Button } from '@/components/ui/button'
import { useGoogleLogin } from '@react-oauth/google'
import { TypeAnimation } from 'react-type-animation'
import { loginTypingSequence } from '@/lib/constant'
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import useGlobal from '@/contexts/global/useGlobal'

import GoogleIcon from '../assets/icons8-google.svg'
// import FacebookIcon from '../assets/icons8-facebook.svg'
import GitHubIcon from '../assets/icons8-github.svg'
import LinkedinIcon from '../assets/icons8-linkedin.svg'

const Login = () => {
  const { globalState } = useGlobal()

  const login = useGoogleLogin({
    onError: err => console.log(`useGoogleLogin | ${err}`),
    ux_mode: 'redirect',
    redirect_uri: globalState.env.VITE_GOOGLE_REDIRECT_URI,
    flow: 'auth-code',
  })

  // const handleFacebookCallback = (response: unknown) => {
  //   if (response?.status === "unknown") {
  //       console.error('Sorry!', 'Something went wrong with facebook Login.');
  //    return;
  //   }
  //   console.log(response);
  // }

  const useGithubLogin = () => {
    const githubClientId = globalState.env.VITE_GITHUB_CLIENT_ID
    const githubCallbackURL = globalState.env.VITE_GITHUB_CALLBACK_URL
    const baseGithubOauth = globalState.env.VITE_GITHUB_BASE_URL
    window.location.href = `${baseGithubOauth}?client_id=${githubClientId}&redirect_uri=${githubCallbackURL}`
  }

  return (
    <div className="Login__Page flex items-center w-full h-[100dvh] justify-center">
      <div className="Login__Page__Container h-[50dvh] p-10 w-3/4">
        <div className="Login_Page__Header text-center">
          <TypeAnimation
            sequence={loginTypingSequence}
            wrapper="h1"
            cursor={true}
            repeat={Infinity}
            deletionSpeed={10}
          />
          <p>Organize your todos from anywhere and anytime with to-do-list.</p>
        </div>
        <hr className="border-t-8 mx-auto my-6" />
        <div className="Login__Page__Form text-center">
          <h2>Sign in with</h2>
          <div className="Login__Page__Option flex justify-center gap-x-2 mt-6">
            <Button onClick={() => login()}>
              <img src={GoogleIcon} alt="Google Icon" width={20} />
              Google
            </Button>
            {/* <FacebookLogin
              appId={globalState?.env?.VITE_FACEBOOK_APP_ID}
              // autoLoad={false}
              // fields="name,email,picture"
              callback={handleFacebookCallback}
              render={renderProps => (
                <Button onClick={renderProps.onClick}>
                  <img src={FacebookIcon} alt="Facebook Icon" width={20} />
                  Facebook
                </Button>
              )}
            /> */}
            <Button onClick={useGithubLogin}>
              <img src={GitHubIcon} alt="GitHub Icon" width={20} />
              GitHub
            </Button>
            {/* <Button>
              <img src={LinkedinIcon} alt="Linkedin Icon" width={20} />
              Linkedin
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

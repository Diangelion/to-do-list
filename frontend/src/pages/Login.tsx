import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";

import GoogleIcon from "../assets/icons8-google.svg";
import FacebookIcon from "../assets/icons8-facebook.svg";
import GitHubIcon from "../assets/icons8-github.svg";
import LinkedinIcon from "../assets/icons8-linkedin.svg";

const Login = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
    onError: (err) => console.log(err),
    onNonOAuthError: () => {},
    flow: "auth-code",
  });

  return (
    <div className='Login__Page flex items-center w-full h-[100dvh] justify-center'>
      <div className='Login__Page__Container h-[50dvh] p-10 w-3/4'>
        <div className='Login_Page__Header text-center'>
          <h1>to-do-list</h1>
          <p>Organize your todos from anywhere and anytime with to-do-list.</p>
        </div>
        <hr className='border-t-8 mx-auto my-6' />
        <div className='Login__Page__Form text-center'>
          <h2>Sign in with</h2>
          <div className='Login__Page__Option flex justify-center gap-x-2 mt-6'>
            <Button onClick={() => login()}>
              <img src={GoogleIcon} alt='Google Icon' width={20} />
              Google
            </Button>
            <Button>
              <img src={FacebookIcon} alt='Facebook Icon' width={20} />
              Facebook
            </Button>
            <Button>
              <img src={GitHubIcon} alt='GitHub Icon' width={20} />
              GitHub
            </Button>
            <Button>
              <img src={LinkedinIcon} alt='Linkedin Icon' width={20} />
              Linkedin
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

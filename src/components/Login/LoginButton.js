import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const {loginWithRedirect,isAuthenticated} = useAuth0();

  return (
      <div>
        {!isAuthenticated &&(
        <button className='login-button' onClick={()=>{
            loginWithRedirect({
                appState: {
                    returnTo: "/profile"
                  }
              });
        }}>
            Log In
        </button>)}
      </div>
  )
}

export default LoginButton
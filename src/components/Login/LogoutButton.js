import React from 'react';
import { useAuth0} from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout, isAuthenticated, } = useAuth0();

  return (
    isAuthenticated && (
      <button onClick={() => {
        logout({
            returnTo:  process.env.REACT_APP_AUTH0_CALLBACK_URL, // Specify your desired redirect URL
          });
      }}>
        LogOut
      </button>
    )
  )
}

export default LogoutButton
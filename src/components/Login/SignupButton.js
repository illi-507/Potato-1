import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const SignupButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    !isAuthenticated && (
      <button className="button__sign-up" onClick={handleSignUp}>
        Sign Up
      </button>
    )
  );
};

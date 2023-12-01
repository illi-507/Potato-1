import React from "react";
import LoginButton from "./components/Login/LoginButton";
import LogoutButton from "./components/Login/LogoutButton";

import { useAuth0 } from "@auth0/auth0-react";
import JSONPretty from "react-json-pretty";
import { SignupButton } from "./components/Login/SignupButton";
function Login() {
  const { user, isAuthenticated } = useAuth0();
  return (
    <div>
      <h1>Login</h1>
      <SignupButton />
      <LoginButton />
      <LogoutButton />
    </div>
  );
}

export default Login;

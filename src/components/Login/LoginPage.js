import React from 'react'
import LoginButton from './LoginButton'
import { SignupButton } from './SignupButton'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function LoginPage({buttonRef}) {
  return (
    <div className='login-page'>
        <SignupButton />
        <LoginButton/>
        <Link to={"/"} ref={buttonRef} className='home-link'>Home</Link>
    </div>
  )
}

export default LoginPage
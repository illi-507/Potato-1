import React,{useRef,useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import { SignupButton } from "./SignupButton";
import LoginButton from "./LoginButton";
import Navbar from "./Navbar";
import LaunchPage from "../Launch";
import LoginPage from "./LoginPage";


const Profile = () => {
  const buttonRef = useRef(null);
  const { user, isAuthenticated } = useAuth0();
  console.log(user, isAuthenticated);

  const handleClickImage = () => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  };

  
  return (
    <div className="profile-body">
     { /*<div className="chatbot-background-overlay"></div>*/} 
     <Navbar handleClickImage={handleClickImage}/> 
    {/*<LaunchPage buttonRef={buttonRef}/> */  } 
     {!isAuthenticated ?
       <LoginPage buttonRef={buttonRef}/> :
       <LaunchPage buttonRef={buttonRef}/>       
    } 
 
    </div>
  );
};

export default Profile;

//product planning export

//Legal ruling check 
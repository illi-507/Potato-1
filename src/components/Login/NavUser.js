import React, { useState, useRef,useEffect}from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faHeadset,
  faCircleUser,
} from "@fortawesome/free-regular-svg-icons";
import LogoutButton from "./LogoutButton";
import NavUserDropdown from "./NavUserDropdown";
function NavUser({}) {
  const { user, isAuthenticated } = useAuth0();
  const [showDropdown, setShowDropdown] = useState(false);
  const logoRef = useRef(null);

  function handleClickLogo(){
    setShowDropdown(true);
  }

  function handleClickAway(){
    setShowDropdown(false);
  }

  const handleClickOutside = (event) => {
    console.log("into1 ");
    if (logoRef.current && !logoRef.current.contains(event.target)) {
      // Clicked outside the logo
      console.log("into 2");
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  // let url = "https://lh3.googleusercontent.com/a/ACg8ocKN1-mO613gxmhxrXQpD9IlUd0oGM3laY66Ixtxzorq_le-=s96-c"
  return (
    <div className="nav-user">
      {isAuthenticated ? (
        <div>
          <img  ref={logoRef} className="user-logo" src={user.picture} alt={user.name} 
          
          onClick={handleClickLogo}/>
        </div>
      ) : (
        <div>
          <div  ref={logoRef}  className="user-logo-placeholder"  onClick={handleClickLogo}>
            <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: "50px",color:"white" }} />
          </div>
        </div>
      )}
      {(showDropdown && isAuthenticated )&&     
      <NavUserDropdown />}
    </div>
  );
}

export default NavUser;

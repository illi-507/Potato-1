import React, { useRef } from "react";

import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <button
        onClick={() => {
          logout({
            returnTo:  process.env.REACT_APP_AUTH0_CALLBACK_URL, // Specify your desired redirect URL
          });
        }}
      >
        LogOut
      </button>
    )
  );
};

function DropdownItem({ title }) {
  let buttonRef  = useRef(null);
  const { logout, isAuthenticated } = useAuth0();
  function handleLogout(){
     if(buttonRef.current){
        buttonRef.current.click();
     }
  }
  return (
    <div>
      <div className="dropdown-item" onClick={handleLogout}>{title}</div>

      <button ref={buttonRef } style={{display:"none"}}
        onClick={() => {
          logout({
            returnTo:  process.env.REACT_APP_AUTH0_CALLBACK_URL, // Specify your desired redirect URL
          });
        }}
      >
        LogOut
      </button>
    </div>
  );
}
function NavUserDropdown() {
  return (
    <div className="nav-user-dropdown-container">
      <div class="triangle"></div>

      <div className="nav-user-dropdown">
        <DropdownItem title={"Sign Out"} />
      </div>
    </div>
  );
}

export default NavUserDropdown;

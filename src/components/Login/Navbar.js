import React,{useRef} from 'react'
import logo from './tradinlogo.png'; 
import NavItem from './NavItem';
import NavUser from "./NavUser";
import LogoutButton from './LogoutButton';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";


function Navbar({handleClickImage}) {
  
    const navItems = [
        "Home", "Suppliers Check",
        "Products Check", 
        "Custom Doc Generating",
        "Reports"
    ];


  return (
    <div className='nav-bar'>
      <img className='nav-logo' onClick={handleClickImage}src={logo} alt='logo'></img>
      
         {
            navItems.map((item,index)=>{
                return <NavItem title={item} key={index}/>
            })
         }

            <NavUser />


    </div>
  )
}

export default Navbar
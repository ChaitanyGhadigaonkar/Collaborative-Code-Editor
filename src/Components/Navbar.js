import React from 'react'
import logo from '../Images/logo.gif'
import {
  Link
} from "react-router-dom";
export default function Navbar({others}) {
    const myStyle = {
        display : "none"
    }
  return (
    
    <>
    <nav id="main-nav">
        <div className="logo">
            <img src={logo} alt="logo" srcSet=""/>
            <div className="nav-mid">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
            </div>
        </div>
        
        <div className="other">
            <Link to="/sign-up">
            <button className="HomeButtons">
                Sign up
            </button>
            </Link>
            
            <Link to="/login">
            <button className="HomeButtons">
                Log in
            </button>
            </Link>
        </div>
    </nav>
    
    </>
  )
}

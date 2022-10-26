import React from 'react'
import logo from '../Images/logo.png';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
export default function Navbar() {
 
  return (
    
    <>
    <nav id="main-nav">
        <div className="logo">
            <img src={logo} alt="logo" srcset=""/>
            <div className="logo-heading">
                <h1>Collaborative Code Editor</h1>
                <p>Realtime collaboration</p>
            </div>
            <div className="nav-mid">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
            </div>
        </div>
        
        <div className="other">
            <Link to="/sign-up">
            <button>
                Sign up
            </button>
            </Link>
            
            <Link to="/login">
            <button>
                Log in
            </button>
            </Link>
        </div>
    </nav>
    <main>
        <h1>Make something great.</h1>
        <span className="main-para">
            <p >Build software collaboratively from anywhere in the world, on any device, without spending a second on setup.</p>
        </span>
        <Link to="/create-room">
        <button className="main-button" >Start Creating</button>
        </Link>
    </main>
    </>
  )
}

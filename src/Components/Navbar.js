import React, { useEffect } from 'react'
import logo from '../Images/logo.gif'
import {
    Link, useLocation, useNavigate
} from "react-router-dom";

export default function Navbar({ others }) {

    // console.log(localStorage.getItem('authtoken'))
    const navigator = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('authtoken');
        navigator("/");
    }
    const location = useLocation();

    return (
        <>
            <nav id="main-nav">
                <div className="logo">
                    <img src={logo} alt="logo" srcSet="" />
                    <div className="nav-mid">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </div>
                </div>

                <div className="other">
                    {/* {location.pathname==`/editor/{}`?
                        <div>
                            <Link to="/">
                                <button className="HomeButtons" onClick={handleLogout}>
                                    Leave room
                                </button>
                            </Link>
                        </div>:""} */}
                    {localStorage.getItem('authtoken') ?
                        <div>
                            <Link to="/">
                                <button className="HomeButtons" onClick={handleLogout}>
                                    Logout
                                </button>
                            </Link>
                        </div>
                        :
                        <div>
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
                        </div>}

                </div>
            </nav>

        </>
    )
}

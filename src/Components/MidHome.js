import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Routes,
    Link
  } from "react-router-dom";
export default function MidHome() {
    return (
        <main>
            <h1>Make something great.</h1>
            <span className="main-para">
                <p >Build software collaboratively from anywhere in the world, on any device, without spending a second on setup.</p>
            </span>
            <Link to="/create-room">
                <button className="main-button" >Start Creating</button>
            </Link>
        </main>
    )
}

import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Toast } from 'react-hot-toast'
import Navbar from './Navbar'


export default function Register() {


  return (<>
    <Navbar />
  
    <div className='register'>
      <h1>Create an Account</h1>
      <div className="formClass">
        
        <form action="" method='post' >
          <input id='userInput' type="text"  placeholder='username' name='username'/>
          <input id='emailInput' type="email" placeholder='Email address' name='email'/>
          <input  id='passInput'type="password" placeholder='Password' name='password' />
          <input  type="password" placeholder='Confirm Password' name='cPassword' />
          <input  type="button" value="+ Create Account"/>
          <p>Have an account ?
          <Link to="/login">Log in</Link></p>
          
        </form>
      </div>

    </div>
    </>
  ) 
}
// disabled={!username || !email || !password ? true : false}
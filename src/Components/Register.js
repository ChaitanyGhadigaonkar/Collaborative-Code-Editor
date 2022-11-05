import React from 'react'
// import { Link } from 'react-router-dom'

// import Navbar from './Navbar'


export default function Register() {
  // var username = document.getElementById('userInput').value
  // // console.log(username)
  // var email = document.getElementById('emailInput').value
  // var password = document.getElementById('passInput').value
  // console.log(document.getElementById("userInput"))

  return (<>
    {/* <Navbar/> */}
  
    <div className='register'>
      <h1>Create an Account</h1>
      <div className="formClass">
        <form action="" method='post' >
          <input id='userInput' type="text"  placeholder='username' />
          <input id='emailInput' type="email" placeholder='Email address' />
          <input  id='passInput'type="password" placeholder='Password' />
          <input  type="button" value="+ Create Account" />
          {/* Have an account ?
          <Link to="/login"> log in </Link> */}
        </form>
      </div>

    </div>
    </>
  ) 
}
// disabled={!username || !email || !password ? true : false}
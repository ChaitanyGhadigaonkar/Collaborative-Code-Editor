import React from 'react'
import { toast } from 'react-hot-toast';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


export default function Login() {
  const host = process.env.REACT_APP_BACKEND_URL;
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigator = useNavigate();
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      // console.log("Room Id and username required")
      toast.error('email and passsword is required');
      return
    }
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email[0], password: credentials.password[0] })
    })
    const result = await response.json();
    if (result.success === true) {
      toast.success('Sucessfully login ');
      localStorage.setItem("authtoken",result.authtoken);
      navigator("/create-room");
    } else {
      toast.error("Email or password is wrong");
      navigator("/login");
    }
  }



  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: [e.target.value] });
  }
  return (
    <div className='login'>
      <form method="post">
        <h1>login to your account</h1>
        <input type="email" placeholder='Email address' id='emailInput' name='email' value={credentials.email} onChange={handleChange} required />
        <input type="password" placeholder='Password' id='passInput' name='password' value={credentials.password} onChange={handleChange} required />
        <button className='loginBtn' onClick={handleSubmit}>login</button>
        <div className="forsignup">
          <p>Don't have account ?</p>
          <Link to="/sign-up">create account</Link>
        </div>
      </form>

    </div>
  )
}

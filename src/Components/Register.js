import React from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const host = process.env.REACT_APP_BACKEND_URL;

export default function Register() {
  const [credentials, setCredentials] = useState({ username: "", email: "", password: "", cPassword: "" });

  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(credentials.password !== credentials.cPassword);
    if(!credentials.username || !credentials.email || !credentials.password || !credentials.cPassword){
      toast.error("All fields are mandetory");
      return
    }
    if (credentials.password[0] !== credentials.cPassword[0]) {
      toast.error("Password and confirm password are not matching");

    } else {
      const response = await fetch(`${host}/api/auth/adduser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: credentials.username[0], email: credentials.email[0], password: credentials.password[0] })
      })
      const result = await response.json();
      if (result.success === true) {
        toast.success('Sucessfully created the account');
        navigator("/login");
      } else {
        toast.error("Something wents wrong please try again");
        navigator("/sign-up");
      }
    }
  }


  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: [e.target.value] });
  }
  return (<>
    <div className='register'>
      <h1>Create an Account</h1>
      <div className="formClass">

        <form method='post'  >
          <input id='userInput' type="text" placeholder='username' name='username' value={credentials.username} onChange={handleChange} required />
          <input id='emailInput' type="email" placeholder='Email address' name='email' value={credentials.email} onChange={handleChange} required />
          <input id='passInput' type="password" placeholder='Password' name='password' value={credentials.password} onChange={handleChange} required />
          <input type="password" placeholder='Confirm Password' name='cPassword' value={credentials.cPassword} onChange={handleChange} required />
          <input type="button"  value="+ Create Account" onClick={handleSubmit} />
          <p>Have an account ?
            <Link to="/login">Log in</Link></p>

        </form>
      </div>

    </div>
  </>
  )
}

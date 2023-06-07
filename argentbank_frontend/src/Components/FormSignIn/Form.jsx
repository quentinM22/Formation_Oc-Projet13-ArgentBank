import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchUserAuth } from '../../RTK/features/Auth/AuthSlice'

const Form = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const navigate = useNavigate()
  const dispatch = useDispatch()

    const handleSubmit = e => {
      e.preventDefault()
      dispatch(fetchUserAuth({email, password}))
          navigate('/dashboard');
        
      }
  return (
  <>
    <form onSubmit={(e)=> handleSubmit(e)}>
    <div className="input-wrapper">
      <label for="username">Username</label
      >
      <input 
      type="text" 
      id="username" 
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className="input-wrapper">
      <label for="password">Password</label>
      <input 
      type="password" 
      id="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
       />
    </div>
    <div className="input-remember">
      <input type="checkbox" id="remember-me" />
      <label for="remember-me">Remember me</label>
    </div>
    {/* <!-- PLACEHOLDER DUE TO STATIC SITE --> */}
    {/* <NavLink to="/dashboard/user:" className="sign-in-button">Sign In</NavLink> */}
    {/* <!-- SHOULD BE THE BUTTON BELOW --> */}
    <button className="sign-in-button" type='submit'>Sign In</button>
   {/* <!--  --> */}
  </form>
  </>
  )
}

export default Form
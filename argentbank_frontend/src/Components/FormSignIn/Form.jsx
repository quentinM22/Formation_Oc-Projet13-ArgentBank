import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchUserAuth, setLoading } from '../../RTK/features/Auth/AuthSlice'
import Spinner from '../Spinner/Spinner'
import { fetchUser } from '../../RTK/features/User/UserSlice'

const Form = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {error} = useSelector(state => state.auth)
  const {isLoading} = useSelector(state => state.auth)

  const handleSubmit =  e => {
    e.preventDefault()
      dispatch(fetchUserAuth({email, password}))
      setTimeout(()=>{
        dispatch(setLoading(false))
        error ? navigate('/error') : navigate('/profile')
        const token = localStorage.getItem('token')
        dispatch(fetchUser(token))
      }, 1000)
      
      
      
  }
  return (
  <>
  {isLoading ? (
    <Spinner />
  ):(
<form onSubmit={(e)=> handleSubmit(e)}>
<div className="input-wrapper">
  <label htmlFor='username'>Username</label
  >
  <input 
  type="text" 
  id="username" 
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  />
</div>
<div className="input-wrapper">
  <label htmlFor='password'>Password</label>
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
{/* <NavLink type='submit' className="sign-in-button">Sign In</NavLink> */}
{/* <!-- SHOULD BE THE BUTTON BELOW --> */}
<button className="sign-in-button" type='submit'>Sign In</button>
{/* <!--  --> */}
</form>
  )}
    
  </>
  )
}

export default Form
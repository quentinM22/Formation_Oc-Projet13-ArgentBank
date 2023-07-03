import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import Form from '../../Components/FormSignIn/Form'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../RTK/features/Auth/AuthSlice'
import { fetchUser } from '../../RTK/features/User/UserSlice'

const SignIn = () => {
  const [connected, isConnected] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if (token){
    dispatch(fetchUser(token))
    console.log(user.data.body)
    if (user.data.body) {
      document.title = `ArgentBank - Connecté en tant que ${user.data.body.firstName} ${user.data.body.lastName}`
      isConnected(true)
    }
    else if(user.error){
      document.title = `ArgentBank - Connexion`
      dispatch(logOut())
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  
  const handleClick = () => {
    dispatch(logOut())
    window.location.reload(true)
  }
  
  return(
    <>
    <Header />
    <main className="main bg-dark">
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      { connected ? (
        <>
        <h1>User Connected</h1>
        <h2>User: <br /> {user.data.body.firstName} {user.data.body.lastName}</h2>
        <button className="sign-in-button" onClick={()=> handleClick()}>LogOut</button>
        </>
        
      ):(
        <>
       <h1>Sign In</h1>
     <Form /> 
     </>
      )}
      
    </section>
  </main>
  <Footer />
  </>
  )
}

export default SignIn
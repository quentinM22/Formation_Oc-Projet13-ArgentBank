import React, { useEffect } from 'react'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import Form from '../../Components/FormSignIn/Form'
import { useDispatch } from 'react-redux'
import { logOut } from '../../RTK/features/Auth/AuthSlice'

const SignIn = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    document.title = `ArgentBank - Connexion`
  })
  const connected = localStorage.getItem("token")
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
      {connected ? (
        <>
        <h1>User Connected</h1>
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
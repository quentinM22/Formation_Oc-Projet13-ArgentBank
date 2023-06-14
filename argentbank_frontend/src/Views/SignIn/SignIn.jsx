import React, { useEffect } from 'react'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import Form from '../../Components/FormSignIn/Form'

const SignIn = () => {
  useEffect(()=>{
    document.title = `ArgentBank - Connexion`
  })
  return (
    <>
    <Header />
    <main className="main bg-dark">
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
     <Form />
    </section>
  </main>
  <Footer />
  </>
  )
}

export default SignIn
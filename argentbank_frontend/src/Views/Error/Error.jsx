import React, { useEffect } from "react"
import Header from "../../Components/Header/Header"
import Footer from "../../Components/Footer/Footer"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"

const Error = () => {
	const errorAuth  = useSelector((state) => state.auth.error)
  	const errorUser = useSelector(state => state.user.error)
  useEffect(()=>{
      document.title = `ArgentBank - Erreur`
  },[])
	return (
		<>
			<Header />
			<main>
				<h1>Erreur</h1>
				<h3>Page non trouvé</h3>
				{errorAuth || errorUser ? <p>Message: {errorAuth || errorUser}</p> : null}
				<NavLink to="/">Retourner à la page d'accueil</NavLink>
			</main>
			<Footer />
		</>
	)
}

export default Error

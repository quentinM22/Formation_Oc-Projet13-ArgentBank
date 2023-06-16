import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchUserAuth, setLoading } from "../../RTK/features/Auth/AuthSlice"
import Spinner from "../Spinner/Spinner"
import { fetchUser } from "../../RTK/features/User/UserSlice"

const Form = () => {
	// Hook => local state
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [rememberMe, setRememberMe] = useState(false)
	// Hook => global state => REDUX
	const { error } = useSelector((state) => state.auth)
	const { isLoading } = useSelector((state) => state.auth)
	// Hook => Other
	const navigate = useNavigate()
	const dispatch = useDispatch()
	/**
	 * UseEffect to get email password rememberMe => localStorage
	 */
	useEffect(() => {
		const storedEmail = localStorage.getItem("email")
		const storedPassword = localStorage.getItem("password")
		const storedRememberMe = localStorage.getItem("rememberMe")

		if (storedEmail && storedPassword) {
			setEmail(storedEmail)
			setPassword(storedPassword)
		}
		if (storedRememberMe) {
			setRememberMe(JSON.parse(storedRememberMe))
		}
	}, [])
	/**
	 * handleSubmit => Validation de formulaire
	 * @param {Event} e 
	 */
	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(email)
		console.log(password)
		const divInput = document.querySelectorAll(".input-wrapper")
		const emailValue = document.querySelector("#username").value
		const passwordValue = document.querySelector("#password").value
		divInput.forEach((div) => {
			const spanError = div.querySelector("small")
			if (spanError) {
				div.removeChild(spanError)
			}
		})
		if (emailValue === "" || passwordValue === "") {
			if (emailValue === "") {
				const spanErrorEmail = document.createElement("small")
				spanErrorEmail.className = "error-form"
				spanErrorEmail.textContent = "Veuillez indiquer votre Email"
				divInput[0].appendChild(spanErrorEmail)
			}
			if (passwordValue === "") {
				const spanErrorPassword = document.createElement("small")
				spanErrorPassword.className = "error-form"
				spanErrorPassword.textContent = "Veuillez indiquer votre Mot de passe"
				divInput[1].appendChild(spanErrorPassword)
			}
		} else {
			dispatch(fetchUserAuth({ email, password }))
			setTimeout(() => {
				dispatch(setLoading(false))
				error ? navigate("/error") : navigate("/profile")

				const token = localStorage.getItem("token")
				dispatch(fetchUser(token))
			}, 1000)
		}
	}
	/**
	 * handleRememberMeChange => Gestion Remember me
	 * @param {Event} e 
	 */
	const handleRememberMeChange = (e) => {
		const checked = e.target.checked
		setRememberMe(checked)
		if (!rememberMe) {
			localStorage.setItem("rememberMe", JSON.stringify(checked))
			localStorage.setItem("email", email)
			localStorage.setItem("password", password)
		} else {
			localStorage.removeItem("rememberMe")
			localStorage.removeItem("email", email)
			localStorage.removeItem("password", password)
		}
	}
	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<form onSubmit={(e) => handleSubmit(e)}>
					<div className="input-wrapper">
						<label htmlFor="username">Email</label>
						<input
							type="text"
							id="username"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="input-wrapper">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="input-remember">
						<input
							type="checkbox"
							id="remember-me"
							checked={rememberMe}
							onChange={handleRememberMeChange}
						/>
						<label for="remember-me">Remember me</label>
					</div>
					{/* <!-- PLACEHOLDER DUE TO STATIC SITE --> */}
					{/* <NavLink type='submit' className="sign-in-button">Sign In</NavLink> */}
					{/* <!-- SHOULD BE THE BUTTON BELOW --> */}
					<button className="sign-in-button" type="submit">
						Sign In
					</button>
					{/* <!--  --> */}
				</form>
			)}
		</>
	)
}

export default Form

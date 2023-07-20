import React from "react"

import logo from "../../Assets/img/argentBankLogo.png"
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logOut } from "../../RTK/features/Auth/AuthSlice"
import { userReset } from "../../RTK/features/User/UserSlice"
const Header = () => {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user.data)
	const navigate = useNavigate()
	const handleClick = () => {
		dispatch(userReset())
		dispatch(logOut())
		navigate("/")
	}
	
	return (
		<nav className="main-nav">
			<NavLink className="main-nav-logo" to="/">
				<img
					className="main-nav-logo-image"
					src={logo}
					alt="Argent Bank Logo"
				/>
				<h1 className="sr-only">Argent Bank</h1>
			</NavLink>
			<div>
				{user.body ? (
					<>
						<NavLink className="main-nav-item" to="/profile" >
							<i className="fa fa-user-circle"></i>
							{" "}{user.body.firstName}
						</NavLink>
						<button className="main-nav-item" onClick={() => handleClick()}>
						<i className="fa-sharp fa-solid fa-right-from-bracket"></i> logOut
						</button>
					</>
				) : (
					<NavLink className="main-nav-item" to="/sign-in">
						<i className="fa fa-user-circle"></i>
						Sign In
					</NavLink>
				)}
			</div>
		</nav>
	)
}

export default Header

import React from "react"

// Importation des differentes View
import Home from "../Views/Home/Home"
import SignIn from "../Views/SignIn/SignIn"
import Dashboard from "../Views/Dashboard/Dashboard"
// import Error from "../Views/Error/Error"

// Création des routes
const routes = [
	{
		path: "/",
		component: <Home />,
	},
	{
		path: "/sign-in",
		component: <SignIn />,
	},
	{
		path: "/dashboard/user:",
		component: <Dashboard />,
	},
	// {
	// 	path: "/*",
	// 	component: <Error />,
	// },
]

const Path = (route) => route.component

export { Path, routes }

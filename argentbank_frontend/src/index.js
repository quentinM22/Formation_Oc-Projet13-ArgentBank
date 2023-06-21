import React from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App/App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./RTK/store"
import { fetchUser } from "./RTK/features/User/UserSlice"

const token = localStorage.getItem("token")

const renderApp = () => {
	createRoot(document.getElementById("root")).render(
		<React.StrictMode>
			<BrowserRouter>
				<Provider store={store}>
					<App />
				</Provider>
			</BrowserRouter>
		</React.StrictMode>
	)
}

if (token) {
	store.dispatch(fetchUser(token)).then(renderApp)
} else {
	renderApp()
}

reportWebVitals()

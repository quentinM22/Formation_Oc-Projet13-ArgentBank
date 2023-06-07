import "./App.css"
import { Path, routes } from "../Routes/routes"
import { Route, Routes } from "react-router-dom"
function App() {
	return (
		<Routes>
			{routes.map((route, i) => (
				<Route key={i} path={route.path} element={<Path {...route} />} />
			))}
		</Routes>
	)
}

export default App

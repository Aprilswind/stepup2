import "./App.css"
import { Landing } from "./screens/Landing"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from "react"
import { UserObjectProvider } from "./context/user"

export const App = () => {
	return (
		<UserObjectProvider>
			<div className="App">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={ <Landing /> } />
					</Routes>
				</BrowserRouter>
			</div>
		</UserObjectProvider>
	)
}


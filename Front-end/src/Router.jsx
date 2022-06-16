import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

/**
 * Router to render the Header and the 3 pages of the application
 *
 * @category Router
 * @component
 * @returns { React.Component } A React component
 */
function Router() {
	return (
		<React.StrictMode>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/profile" element={<Profile />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</React.StrictMode>
	);
}

export default Router;

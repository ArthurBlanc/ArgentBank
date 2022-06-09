import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { isConnectedAction, userTokenAction } from "../../store/store";

import { useDispatch, useSelector } from "react-redux";

function Login() {
	let navigate = useNavigate();
	const dispatch = useDispatch();

	const baseURL = useSelector((state) => state.baseURL);
	const isConnected = useSelector((state) => state.isConnected);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		if (isConnected) {
			navigate("/profile");
		}
	}, [isConnected, navigate]);

	const login = (email, password) => {
		axios
			.post(baseURL + "/user/login", {
				email: email,
				password: password,
			})
			.then((response) => {
				dispatch(userTokenAction(response.data.body.token));
				dispatch(isConnectedAction(true));
			})
			.catch((error) => {
				console.log(error);
				dispatch(isConnectedAction(false));
			});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		login(email, password);
	};

	return (
		<main className="main bg-dark">
			<section className="sign-in-content">
				<i className="fa fa-user-circle sign-in-icon"></i>
				<h1>Sign In</h1>
				<form onSubmit={handleSubmit}>
					<div className="input-wrapper">
						<label htmlFor="username">Username</label>
						<input type="text" id="username" onChange={(e) => setEmail(e.target.value)} />
					</div>
					<div className="input-wrapper">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
					</div>
					<div className="input-remember">
						<input type="checkbox" id="remember-me" />
						<label htmlFor="remember-me">Remember me</label>
					</div>
					<button type="submit" className="sign-in-button">
						Sign In
					</button>
				</form>
			</section>
		</main>
	);
}

export default Login;

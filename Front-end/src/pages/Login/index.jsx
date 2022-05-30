import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	let navigate = useNavigate();
	const baseURL = "http://localhost:3001/api/v1";

	const login = (email, password) => {
		axios
			.post(baseURL + "/user/login", {
				email: email,
				password: password,
			})
			.then((response) => {
				console.log(response.data.body.token);
				navigate("/profile", { replace: true });
			})
			.catch((error) => {
				console.log(error);
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

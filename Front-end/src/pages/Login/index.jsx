import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fetchOrUpdateLogin } from "../../store/login";

import { selectLoginError, selectIsConnected, selectBaseURL } from "../../store/selectors";

import { getWithExpiry } from "../../utils/withExpiry";

import { useDispatch, useSelector } from "react-redux";

/**
 * Render Profil page that uses a redux store to check if the user is logged in. If the user is logged
 * in, it redirects to the profile page. If the user is not logged in, it displays the login form.
 *
 * @category Pages
 * @component
 * @returns { React.Component } A React component
 */
function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const localUserToken = getWithExpiry("userToken");
	const localUserEmail = localStorage.getItem("userEmail");

	const baseURL = useSelector(selectBaseURL());
	const loginError = useSelector(selectLoginError());
	const isConnected = useSelector(selectIsConnected());

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);

	/**
	 * When the user clicks the submit button, prevent the default action, then if the user has checked
	 * the remember me box, save the user's email to local storage, otherwise remove the user's email from
	 * local storage, then dispatch the fetchOrUpdateLogin function with the baseURL, email, and password
	 * as arguments.
	 */
	const handleSubmit = async (event) => {
		event.preventDefault();
		rememberMe ? localStorage.setItem("userEmail", email) : localStorage.removeItem("userEmail");
		dispatch(fetchOrUpdateLogin(baseURL, email, password));
	};

	/**
	 * When the user clicks the checkbox, the value of the checkbox is set to the opposite of what it was
	 * before.
	 */
	const handleRememberMe = () => {
		setRememberMe(!rememberMe);
	};

	useEffect(() => {
		/* This is checking if the user is logged in. If the user is logged in, it redirects to the profile
		page. */
		if (localUserToken || (isConnected && loginError === null)) {
			navigate("/profile");
		}
		/* This is checking if the user has checked the remember me box. If the user has checked the remember
		me box, it sets the email input to the user's email. */
		if (localUserEmail) {
			setRememberMe(true);
			setEmail(localUserEmail);
		}
	}, [localUserToken, isConnected, loginError, dispatch, navigate, localUserEmail, setEmail]);

	return (
		<main className="main bg-dark">
			<section className="sign-in-content">
				<i className="fa fa-user-circle sign-in-icon"></i>
				<h1>Sign In</h1>
				<form onSubmit={handleSubmit}>
					<div className="input-wrapper">
						<label htmlFor="username">Username</label>
						<input type="text" id="username" value={email} onChange={(e) => setEmail(e.target.value)} />
					</div>
					<div className="input-wrapper">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
					</div>
					<div className="input-remember">
						<input type="checkbox" id="remember-me" checked={rememberMe} onChange={handleRememberMe} />
						<label htmlFor="remember-me">Remember me</label>
					</div>

					<button type="submit" className="sign-in-button">
						Sign In
					</button>
					{loginError && <div className="input-remember input-error">{loginError.response.data.message}</div>}
				</form>
			</section>
		</main>
	);
}

export default Login;

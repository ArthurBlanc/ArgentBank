import { NavLink, Link } from "react-router-dom";

import logo from "../../assets/argentBankLogo.png";

import { userResetAction } from "../../store/user";

import { selectUserFirstName } from "../../store/selectors";

import { useDispatch, useSelector } from "react-redux";

/**
 * Render a nav element with the logo, if user is login, it show he's firstName and a Sign-out option,
 * if user is not login, it show a link to the login page
 *
 * @category Components
 * @component
 * @returns { React.Component } A React component
 */
function Header() {
	const dispatch = useDispatch();

	const userFirstName = useSelector(selectUserFirstName());

	/**
	 * When the user clicks the sign out button, the userResetAction() function is called, which resets
	 * the user state to null.
	 */
	const signOut = () => {
		dispatch(userResetAction());
	};

	return (
		<nav className="main-nav">
			<Link className="main-nav-logo" to="/">
				<img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
				<h1 className="sr-only">Argent Bank</h1>
			</Link>
			<div>
				{!userFirstName && (
					<NavLink className="main-nav-item" to="/login">
						<i className="fa fa-user-circle"></i>
						Sign In
					</NavLink>
				)}

				{userFirstName && (
					<NavLink className="main-nav-item" to="/profile">
						<i className="fa fa-user-circle"></i>
						{!userFirstName && "Profile"}
						{userFirstName && userFirstName}
					</NavLink>
				)}
				{userFirstName && (
					<NavLink onClick={signOut} className="main-nav-item" to="/">
						<i className="fa fa-sign-out"></i>
						Sign Out
					</NavLink>
				)}
			</div>
		</nav>
	);
}

export default Header;

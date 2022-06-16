import { NavLink, Link } from "react-router-dom";

import logo from "../../assets/argentBankLogo.png";

import { userResetAction } from "../../store/user";

import { selectUserFirstName } from "../../store/selectors";

import { useDispatch, useSelector } from "react-redux";

function Header() {
	const dispatch = useDispatch();

	const userFirstName = useSelector(selectUserFirstName());

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

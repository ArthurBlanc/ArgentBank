import { NavLink, Link } from "react-router-dom";

import logo from "../../assets/argentBankLogo.png";

import { isConnectedAction, userDataAction } from "../../store/store";

import { useDispatch, useSelector } from "react-redux";

function Header() {
	const dispatch = useDispatch();

	const userData = useSelector((state) => state.userData);
	const isConnected = useSelector((state) => state.isConnected);

	const signOut = () => {
		dispatch(isConnectedAction(false));
		dispatch(userDataAction(null));
	};

	return (
		<nav className="main-nav">
			<Link className="main-nav-logo" to="/">
				<img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
				<h1 className="sr-only">Argent Bank</h1>
			</Link>
			<div>
				{!isConnected && (
					<NavLink className="main-nav-item" to="/login">
						<i className="fa fa-user-circle"></i>
						Sign In
					</NavLink>
				)}

				{isConnected && (
					<NavLink className="main-nav-item" to="/profile">
						<i className="fa fa-user-circle"></i>
						{!userData && "Profile"}
						{userData && userData.firstName}
					</NavLink>
				)}
				{isConnected && (
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

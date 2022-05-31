import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context";

import logo from "../../assets/argentBankLogo.png";

function Header() {
	const { isConnected, setIsConnected } = useContext(Context);

	const signOut = () => {
		setIsConnected(false);
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
						Tony
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

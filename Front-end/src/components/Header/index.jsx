import { NavLink, Link } from "react-router-dom";

import logo from "../../assets/argentBankLogo.png";

function Header() {
	return (
		<nav className="main-nav">
			<Link className="main-nav-logo" to="/">
				<img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
				<h1 className="sr-only">Argent Bank</h1>
			</Link>
			<div>
				<NavLink className="main-nav-link" to="/sign-in">
					<i className="fa fa-user-circle"></i>
					Sign In
				</NavLink>
			</div>
		</nav>
	);
}

export default Header;

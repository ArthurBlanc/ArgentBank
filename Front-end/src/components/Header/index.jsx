import { NavLink, Link } from "react-router-dom";

import logo from "../../assets/argentBankLogo.png";

function Header() {
	return (
		<nav class="main-nav">
			<Link className="main-nav-logo" to="/">
				<img class="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
				<h1 class="sr-only">Argent Bank</h1>
			</Link>
			<div>
				<NavLink className="main-nav-link" to="/sign-in">
					<i class="fa fa-user-circle"></i>
					Sign In
				</NavLink>
			</div>
		</nav>
	);
}

export default Header;

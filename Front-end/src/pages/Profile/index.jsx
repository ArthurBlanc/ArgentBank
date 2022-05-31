import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context";

function Profile() {
	const { userToken, baseURL, isConnected } = useContext(Context);
	const [userFirstname, setUserFirstname] = useState(null);
	const [userLastname, setUserLastname] = useState(null);
	let navigate = useNavigate();

	useEffect(() => {
		if (!isConnected) {
			navigate("/login", { replace: true });
		}

		const user = (token) => {
			axios({
				method: "POST",
				url: baseURL + "/user/profile",
				headers: { Authorization: `Bearer ${token}` },
			})
				.then((response) => {
					setUserFirstname(response.data.body.firstName);
					setUserLastname(response.data.body.lastName);
				})
				.catch((error) => {
					console.log(error);
				});
		};

		user(userToken);
	}, [userToken, baseURL, isConnected, navigate]);

	if (!userFirstname) {
		return null;
	}

	return (
		<main className="main bg-dark">
			<div className="header">
				<h1>
					Welcome back
					<br />
					{userFirstname} {userLastname}!
				</h1>
				<button className="edit-button">Edit Name</button>
			</div>
			<h2 className="sr-only">Accounts</h2>
			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Checking (x8349)</h3>
					<p className="account-amount">$2,082.79</p>
					<p className="account-amount-description">Available Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button">View transactions</button>
				</div>
			</section>
			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Savings (x6712)</h3>
					<p className="account-amount">$10,928.42</p>
					<p className="account-amount-description">Available Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button">View transactions</button>
				</div>
			</section>
			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
					<p className="account-amount">$184.30</p>
					<p className="account-amount-description">Current Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button">View transactions</button>
				</div>
			</section>
		</main>
	);
}

export default Profile;

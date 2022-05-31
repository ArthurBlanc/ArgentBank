import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context";

import AccountCard from "../../components/AccountCard";

import { useFetch } from "../../utils/useFetch";

function Profile() {
	const { userToken, baseURL, isConnected, userData, setUserData } = useContext(Context);

	let navigate = useNavigate();

	const account = useFetch(window.location.origin + "/account-data.json");

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
					setUserData(response.data.body);
				})
				.catch((error) => {
					console.log(error);
				});
		};

		user(userToken);
	}, [userToken, baseURL, isConnected, navigate]);

	if (!userData || !account.data) {
		return null;
	}

	let accountData = account.data.find((item) => item.userId === userData.id);

	return (
		<main className="main bg-dark">
			<div className="header">
				<h1>
					Welcome back
					<br />
					{userData.firstName} {userData.lastName}!
				</h1>
				<button className="edit-button">Edit Name</button>
			</div>
			<h2 className="sr-only">Accounts</h2>
			{accountData && accountData.account.map((account, index) => <AccountCard key={account.title + "-" + index} title={account.title} amount={account.amount} description={account.description} />)}
		</main>
	);
}

export default Profile;

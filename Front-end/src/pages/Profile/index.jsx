import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import AccountCard from "../../components/AccountCard";

import { useFetch } from "../../utils/useFetch";
import { userDataAction } from "../../store/store";

import { useDispatch, useSelector } from "react-redux";

import "./styles.css";

function Profile() {
	let navigate = useNavigate();
	const dispatch = useDispatch();

	const isConnected = useSelector((state) => state.isConnected);
	const baseURL = useSelector((state) => state.baseURL);
	const userToken = useSelector((state) => state.userToken);
	const userData = useSelector((state) => state.userData);

	const [newFirstName, setNewFirstName] = useState(null);
	const [newLastName, setNewLastName] = useState(null);
	const [showEditNameForm, setShowEditNameForm] = useState(false);

	const account = useFetch(window.location.origin + "/account-data.json");

	const handleSubmit = async (event) => {
		event.preventDefault();
		newName(newFirstName, newLastName);
		getUser();
		setShowEditNameForm(false);
	};

	const toggleEditNameForm = () => {
		if (showEditNameForm) {
			setShowEditNameForm(false);
		} else {
			setShowEditNameForm(true);
		}
	};

	const getUser = useCallback(() => {
		const user = async (token) => {
			axios({
				method: "POST",
				url: baseURL + "/user/profile",
				headers: { Authorization: `Bearer ${token}` },
			})
				.then((response) => {
					dispatch(userDataAction(response.data.body));
					setNewFirstName(response.data.body.firstName);
					setNewLastName(response.data.body.lastName);
				})
				.catch((error) => {
					console.log(error);
				});
		};
		user(userToken);
	}, [dispatch, baseURL, userToken]);

	const newName = (firstname, lastname) => {
		axios({
			method: "PUT",
			url: baseURL + "/user/profile",
			headers: { Authorization: `Bearer ${userToken}` },
			data: {
				firstName: firstname,
				lastName: lastname,
			},
		})
			.then((response) => {
				console.log(response);
				getUser();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		if (!isConnected) {
			navigate("/login", { replace: true });
		}
		getUser();
	}, [isConnected, navigate, getUser]);

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
				{!showEditNameForm && (
					<button className="edit-button" onClick={toggleEditNameForm}>
						Edit Name
					</button>
				)}
				{showEditNameForm && (
					<form className="new-name-form" onSubmit={handleSubmit}>
						<div className="input-group">
							<div className="input-wrapper">
								<label className="hidden" htmlFor="firstname">
									Firstname
								</label>
								<input type="text" id="firstname" onChange={(e) => setNewFirstName(e.target.value)} value={newFirstName} />
							</div>
							<div className="input-wrapper">
								<label className="hidden" htmlFor="lastname">
									Lastname
								</label>
								<input type="text" id="lastname" onChange={(e) => setNewLastName(e.target.value)} value={newLastName} />
							</div>
						</div>
						<div className="input-group">
							<button type="submit" className="edit-button">
								Save
							</button>
							<button className="edit-button" onClick={toggleEditNameForm}>
								Cancel
							</button>
						</div>
					</form>
				)}
			</div>
			<h2 className="sr-only">Accounts</h2>
			{accountData && accountData.account.map((account, index) => <AccountCard key={account.title + "-" + index} title={account.title} amount={account.amount} description={account.description} />)}
		</main>
	);
}

export default Profile;

import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import AccountCard from "../../components/AccountCard";

import { fetchOrUpdateAccount } from "../../store/account";

import { userDataAction } from "../../store/user";

import { selectBaseURL, selectIsConnected, selectUserToken, selectUserId, selectUserFirstName, selectUserLastName, selectUserAccountData } from "../../store/selectors";

import { useDispatch, useSelector } from "react-redux";

import "./styles.css";

function Profile() {
	let navigate = useNavigate();
	const dispatch = useDispatch();

	const baseURL = useSelector(selectBaseURL());
	const isConnected = useSelector(selectIsConnected());
	const userToken = useSelector(selectUserToken());
	const userId = useSelector(selectUserId());
	const userFirstName = useSelector(selectUserFirstName());
	const userLastName = useSelector(selectUserLastName());
	const accountData = useSelector(selectUserAccountData(userId ? userId : null));

	const [newFirstName, setNewFirstName] = useState(null);
	const [newLastName, setNewLastName] = useState(null);
	const [showEditNameForm, setShowEditNameForm] = useState(false);

	const handleSubmit = (event) => {
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
		const user = (token) => {
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
		dispatch(fetchOrUpdateAccount);
	}, [dispatch]);

	useEffect(() => {
		getUser();
	}, [getUser]);

	useEffect(() => {
		if (!isConnected) {
			navigate("/login", { replace: true });
		}
	}, [isConnected, navigate]);

	if (!userFirstName || !userLastName) {
		return null;
	}

	return (
		<main className="main bg-dark">
			<div className="header">
				<h1>
					Welcome back
					<br />
					{userFirstName && userFirstName} {userLastName && userLastName}!
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

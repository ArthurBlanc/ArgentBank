import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AccountCard from "../../components/AccountCard";

import { fetchOrUpdateAccount } from "../../store/account";
import { fetchOrUpdateUser } from "../../store/user";

import { modifyUserName } from "../../store/user";

import { getWithExpiry } from "../../utils/withExpiry";

import {
	selectBaseURL,
	selectIsConnected,
	selectUserToken,
	selectUserStatus,
	selectUserError,
	selectUserId,
	selectUserFirstName,
	selectUserLastName,
	selectAccountStatus,
	selectAccountError,
	selectUserAccountData,
} from "../../store/selectors";

import { useDispatch, useSelector } from "react-redux";

import "./styles.css";

function Profile() {
	let navigate = useNavigate();
	const dispatch = useDispatch();

	const localUserToken = getWithExpiry("userToken");

	const baseURL = useSelector(selectBaseURL());
	const isConnected = useSelector(selectIsConnected());
	const userToken = useSelector(selectUserToken());
	const userStatus = useSelector(selectUserStatus());
	const userError = useSelector(selectUserError());
	const userId = useSelector(selectUserId());
	const userFirstName = useSelector(selectUserFirstName());
	const userLastName = useSelector(selectUserLastName());
	const accountStatus = useSelector(selectAccountStatus());
	const accountError = useSelector(selectAccountError());
	const accountData = useSelector(selectUserAccountData(userId));

	const [newFirstName, setNewFirstName] = useState(null);
	const [newLastName, setNewLastName] = useState(null);
	const [showEditNameForm, setShowEditNameForm] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(modifyUserName(baseURL, userToken, newFirstName, newLastName));
		setShowEditNameForm(false);
	};

	const toggleEditNameForm = () => {
		showEditNameForm ? setShowEditNameForm(false) : setShowEditNameForm(true);
	};

	useEffect(() => {
		if (localUserToken && !userToken) {
			dispatch(fetchOrUpdateUser(baseURL, localUserToken));
		}
	}, [localUserToken, userToken, dispatch, baseURL]);

	useEffect(() => {
		dispatch(fetchOrUpdateAccount);
	}, [dispatch]);

	useEffect(() => {
		setNewFirstName(userFirstName);
		setNewLastName(userLastName);
	}, [userFirstName, userLastName]);

	useEffect(() => {
		if (!isConnected && !localUserToken) {
			navigate("/login");
		}
	}, [isConnected, localUserToken, navigate]);

	if (userError !== null || accountError !== null) {
		return (
			<main className="main bg-dark">
				<div className="header">
					<h1>Error... </h1>
					<h2>
						{userError && "User data: " + userError.response.statusText} {accountError && "Account data: " + accountError.response.statusText}
					</h2>
				</div>
			</main>
		);
	}

	if (userStatus !== "resolved" || accountStatus !== "resolved") {
		return (
			<main className="main bg-dark">
				<div className="header">
					<h1>Loading...</h1>
				</div>
			</main>
		);
	}

	if (userStatus === "rejected" || accountStatus === "rejected") {
		return (
			<main className="main bg-dark">
				<div className="header">
					<h1>Your request is rejected</h1>
				</div>
			</main>
		);
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

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

import "./styles.scss";

/**
 * Render Profil page that uses a redux store to check if the user is logged in. If the user is logged
 * in, it display user account data. If the user is not logged in, it redirects to the login page.
 *
 * @category Pages
 * @component
 * @returns { React.Component } A React component
 */
function Profile() {
	const navigate = useNavigate();
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
	const [editNameFormError, setEditNameFormError] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		/* It's checking if the new first name and new last name are the same as the user first name and user
		last name. If they are the same, it sets the error message to "There are no change". */
		if (newFirstName === userFirstName && newLastName === userLastName) {
			setEditNameFormError("There are no change");
		} /* It's checking if the new first name and new last name are empty. If they are empty, it sets the
		error message to "Inputs can't be empty". */ else if (newFirstName.length === 0 || newLastName.length === 0) {
			setEditNameFormError("Inputs can't be empty");
		} /* It's checking if the new first name and new last name are not empty. If they are not empty, it
		dispatches the modifyUserName action and it sets the showEditNameForm state to false and the
		editNameFormError state to an empty string. */ else if (newFirstName.length > 0 && newLastName.length > 0) {
			dispatch(modifyUserName(baseURL, userToken, newFirstName, newLastName));
			setShowEditNameForm(false);
			setEditNameFormError("");
		}
	};

	/**
	 * If showEditNameForm is true, set showEditNameForm to false, otherwise set showEditNameForm to true.
	 */
	const toggleEditNameForm = () => {
		showEditNameForm ? setShowEditNameForm(false) : setShowEditNameForm(true);
	};

	useEffect(() => {
		/* It's checking if the localUserToken is not null and if the userToken is null. If the
		localUserToken is not null and the userToken is null, it dispatches the fetchOrUpdateUser action. */
		if (localUserToken && !userToken) {
			dispatch(fetchOrUpdateUser(baseURL, localUserToken));
		}
	}, [localUserToken, userToken, dispatch, baseURL]);

	useEffect(() => {
		/* It's dispatching the fetchOrUpdateAccount action. */
		dispatch(fetchOrUpdateAccount);
	}, [dispatch]);

	useEffect(() => {
		/* It's setting the newFirstName state to the userFirstName and the newLastName state to the
		userLastName. */
		setNewFirstName(userFirstName);
		setNewLastName(userLastName);
	}, [userFirstName, userLastName]);

	useEffect(() => {
		/* It's checking if the isConnected state is false and if the localUserToken is null. If the
		isConnected state is false and the localUserToken is null, it redirects to the login page. */
		if (!isConnected && !localUserToken) {
			navigate("/login");
		}
	}, [isConnected, localUserToken, navigate]);

	/* It's checking if the userError state is not null or if the accountError state is not null. If the
userError state is not null or the accountError state is not null, it returns a component that
displays an error message. */
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

	/* It's checking if the userStatus state is not resolved or if the accountStatus state is not resolved.
If the userStatus state is not resolved or the accountStatus state is not resolved, it returns a
component that displays a loading message. */
	if (userStatus !== "resolved" || accountStatus !== "resolved") {
		return (
			<main className="main bg-dark">
				<div className="header">
					<h1>Loading...</h1>
				</div>
			</main>
		);
	}

	/* It's checking if the userStatus state is rejected or if the accountStatus state is rejected. If the
userStatus state is rejected or the accountStatus state is rejected, it returns a component that
displays a message. */
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
						<div className="input-group input-center">
							<button type="submit" className="edit-button">
								Save
							</button>
							<button className="edit-button" onClick={toggleEditNameForm}>
								Cancel
							</button>
						</div>
						<div className="input-group input-center">{editNameFormError && <div className="input-new-names input-error">{editNameFormError}</div>}</div>
					</form>
				)}
			</div>
			<h2 className="sr-only">Accounts</h2>
			{accountData && accountData.account.map((account, index) => <AccountCard key={account.title + "-" + index} title={account.title} amount={account.amount} description={account.description} />)}
		</main>
	);
}

export default Profile;

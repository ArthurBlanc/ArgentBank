import axios from "axios";
import { createAction, createReducer } from "@reduxjs/toolkit";

import { userTokenAction, isConnectedAction, fetchOrUpdateUser } from "./user";

import { setWithExpiry } from "../utils/withExpiry";

const initialState = {
	status: "void",
	response: null,
	error: null,
};

const loginFetchingAction = createAction("login/fetching");
const loginResolvedAction = createAction("login/resolved");
const loginRejectedAction = createAction("login/rejected");

/**
 * Function to check login and store some userData.
 * @param {String} baseURL - URL of the API.
 * @param {String} email - Email enter in the login form.
 * @param {String} password - Password enter in the login form.
 * @returns A function that takes dispatch and getState as arguments.
 */
export const fetchOrUpdateLogin = (baseURL, email, password) => {
	return async (dispatch, getState) => {
		/**
		 * If the status of the login is pending or updating, then return.
		 */
		const selectLogin = (state) => state.login;
		const status = selectLogin(getState()).status;
		if (status === "pending" || status === "updating") {
			return;
		}

		dispatch(loginFetchingAction());
		/* Making a post request to the server to check email and password and return some userData. */
		await axios
			.post(baseURL + "/user/login", {
				email: email,
				password: password,
			})
			.then((response) => {
				dispatch(loginResolvedAction(response.data));
				dispatch(fetchOrUpdateUser(baseURL, response.data.body.token));
				dispatch(userTokenAction(response.data.body.token));
				setWithExpiry("userToken", response.data.body.token, 1000 * 60 * 60); //ms * sec * min
				dispatch(isConnectedAction(true));
			})
			.catch((error) => {
				dispatch(isConnectedAction(false));
				dispatch(loginRejectedAction(error));
			});
	};
};

/* Create login reducer. */
export default createReducer(initialState, (builder) =>
	builder
		.addCase(loginFetchingAction, (draft) => {
			if (draft.status === "void") {
				draft.status = "pending";
				return;
			}
			if (draft.status === "rejected") {
				draft.error = null;
				draft.status = "pending";
				return;
			}
			if (draft.status === "resolved") {
				draft.status = "updating";
				return;
			}
			return;
		})
		.addCase(loginResolvedAction, (draft, action) => {
			if (draft.status === "pending" || draft.status === "updating") {
				draft.response = action.payload;
				draft.status = "resolved";
				return;
			}
			return;
		})
		.addCase(loginRejectedAction, (draft, action) => {
			if (draft.status === "pending" || draft.status === "updating") {
				draft.status = "rejected";
				draft.error = action.payload;
				draft.response = null;
				return;
			}
			return;
		})
);

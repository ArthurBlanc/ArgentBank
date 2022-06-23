import axios from "axios";
import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
	status: "void",
	error: null,
	isConnected: false,
	token: null,
	id: null,
	email: null,
	firstName: null,
	lastName: null,
	createdAt: null,
	updatedAt: null,
};

const userFetchingAction = createAction("user/fetching");
const userResolvedAction = createAction("user/resolved");
const userRejectedAction = createAction("user/rejected");

export const isConnectedAction = createAction("user/isConnected");
export const userTokenAction = createAction("user/token");
export const userResetAction = createAction("user/reset");

/**
 * Function to check userToken and store more userData.
 * @param {String} baseURL - URL of the API.
 * @param {String} token - Token for user authentification.
 * @returns A function that takes dispatch and getState as arguments.
 */
export const fetchOrUpdateUser = (baseURL, token) => {
	return async (dispatch, getState) => {
		/**
		 * If the status of the user is pending or updating, then return.
		 */
		const selectUser = (state) => state.user;
		const status = selectUser(getState()).status;
		if (status === "pending" || status === "updating") {
			return;
		}

		dispatch(userFetchingAction());
		/* Making a post request to the server to get more userData. */
		await axios({
			method: "POST",
			url: baseURL + "/user/profile",
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => {
				dispatch(userResolvedAction(response.data));
				dispatch(userTokenAction(token));
				dispatch(isConnectedAction(true));
			})
			.catch((error) => {
				dispatch(userRejectedAction(error));
			});
	};
};

/**
 * Function to check userToken and modify user firstname and lastname.
 * @param {String} baseURL - URL of the API.
 * @param {String} token - Token for user authentification.
 * @param {String} firstname - New firstname of the user.
 * @param {String} lastname - New lastname of the user.
 * @returns A function that takes dispatch and getState as arguments.
 */
export const modifyUserName = (baseURL, token, firstname, lastname) => {
	return async (dispatch, getState) => {
		/**
		 * If the status of the user is pending or updating, then return.
		 */
		const selectUser = (state) => state.user;
		const status = selectUser(getState()).status;
		if (status === "pending" || status === "updating") {
			return;
		}

		dispatch(userFetchingAction());
		/* Making a put request to the server to edit firstname and lastname */
		axios({
			method: "PUT",
			url: baseURL + "/user/profile",
			headers: { Authorization: `Bearer ${token}` },
			data: {
				firstName: firstname,
				lastName: lastname,
			},
		})
			.then((response) => {
				dispatch(userResolvedAction(response.data));
			})
			.catch((error) => {
				dispatch(userRejectedAction(error));
			});
	};
};

/* Create user reducer. */
export default createReducer(initialState, (builder) =>
	builder
		.addCase(userFetchingAction, (draft) => {
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
		.addCase(userResolvedAction, (draft, action) => {
			if (draft.status === "pending" || draft.status === "updating") {
				draft.id = action.payload.body.id;
				draft.email = action.payload.body.email;
				draft.firstName = action.payload.body.firstName;
				draft.lastName = action.payload.body.lastName;
				draft.createdAt = action.payload.body.createdAt;
				draft.updatedAt = action.payload.body.updatedAt;
				draft.status = "resolved";
				return;
			}
			return;
		})
		.addCase(userRejectedAction, (draft, action) => {
			if (draft.status === "pending" || draft.status === "updating") {
				draft.status = "rejected";
				draft.error = action.payload;
				draft.isConnected = initialState.isConnected;
				draft.token = initialState.token;
				draft.id = initialState.id;
				draft.email = initialState.email;
				draft.firstName = initialState.firstName;
				draft.lastName = initialState.lastName;
				draft.createdAt = initialState.createdAt;
				draft.updatedAt = initialState.updatedAt;
				return;
			}
			return;
		})
		.addCase(isConnectedAction, (draft, action) => {
			draft.isConnected = action.payload;
			return;
		})
		.addCase(userTokenAction, (draft, action) => {
			draft.token = action.payload;
			return;
		})
		.addCase(userResetAction, (draft) => {
			draft.status = initialState.status;
			draft.error = initialState.error;
			draft.isConnected = initialState.isConnected;
			draft.token = initialState.token;
			draft.id = initialState.id;
			draft.email = initialState.email;
			draft.firstName = initialState.firstName;
			draft.lastName = initialState.lastName;
			draft.createdAt = initialState.createdAt;
			draft.updatedAt = initialState.updatedAt;
			localStorage.removeItem("userToken");
			return;
		})
);

import axios from "axios";
import { createAction, createReducer } from "@reduxjs/toolkit";

import { userTokenAction, isConnectedAction, fetchOrUpdateUser } from "./user";

const initialState = {
	status: "void",
	response: null,
	error: null,
};

const loginFetchingAction = createAction("login/fetching");
const loginResolvedAction = createAction("login/resolved");
const loginRejectedAction = createAction("login/rejected");

export const fetchOrUpdateLogin = (baseURL, email, password) => {
	return async (dispatch, getState) => {
		const selectLogin = (state) => state.login;
		const status = selectLogin(getState()).status;
		if (status === "pending" || status === "updating") {
			return;
		}

		dispatch(loginFetchingAction());
		await axios
			.post(baseURL + "/user/login", {
				email: email,
				password: password,
			})
			.then((response) => {
				dispatch(loginResolvedAction(response.data));
				dispatch(fetchOrUpdateUser(baseURL, response.data.body.token));
				dispatch(userTokenAction(response.data.body.token));
				dispatch(isConnectedAction(true));
			})
			.catch((error) => {
				dispatch(isConnectedAction(false));
				dispatch(loginRejectedAction(error));
			});
	};
};

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

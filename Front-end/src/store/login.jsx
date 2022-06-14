import axios from "axios";
import { createAction, createReducer } from "@reduxjs/toolkit";

import { userTokenAction, isConnectedAction } from "./user";

const initialState = {
	status: "void",
	response: null,
	error: null,
};

const loginFetchingAction = createAction("login/fetching");
const loginResolvedAction = createAction("login/resolved");
const loginRejectedAction = createAction("login/rejected");

export const fetchOrUpdateLogin = async (store, baseURL, email, password) => {
	const selectLogin = (state) => state.login;
	const status = selectLogin(store.getState()).status;
	if (status === "pending" || status === "updating") {
		return;
	}

	store.dispatch(loginFetchingAction());
	await axios
		.post(baseURL + "/user/login", {
			email: email,
			password: password,
		})
		.then((response) => {
			store.dispatch(loginResolvedAction(response.data));
			store.dispatch(userTokenAction(response.data.body.token));
			store.dispatch(isConnectedAction(true));
		})
		.catch((error) => {
			console.log(error);
			store.dispatch(isConnectedAction(false));
			store.dispatch(loginRejectedAction(error));
		});
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

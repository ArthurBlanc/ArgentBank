import axios from "axios";
import produce from "immer";

import { userTokenAction, isConnectedAction } from "./user";

const initialState = {
	status: "void",
	response: null,
	error: null,
};

const FETCHING = "login/fetching";
const RESOLVED = "login/resolved";
const REJECTED = "login/rejected";

const loginFetchingAction = () => ({ type: FETCHING });
const loginResolvedAction = (data) => ({ type: RESOLVED, payload: data });
const loginRejectedAction = (error) => ({ type: REJECTED, payload: error });

export async function fetchOrUpdateLogin(store, baseURL, email, password) {
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
}

export default function loginReducer(state = initialState, action) {
	return produce(state, (draft) => {
		switch (action.type) {
			case FETCHING: {
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
			}
			case RESOLVED: {
				if (draft.status === "pending" || draft.status === "updating") {
					draft.response = action.payload;
					draft.status = "resolved";
					return;
				}
				return;
			}
			case REJECTED: {
				if (draft.status === "pending" || draft.status === "updating") {
					draft.status = "rejected";
					draft.error = action.payload;
					draft.response = null;
					return;
				}
				return;
			}
			default:
				return;
		}
	});
}

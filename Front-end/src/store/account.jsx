import axios from "axios";
import produce from "immer";

const initialState = {
	status: "void",
	data: null,
	error: null,
};

const FETCHING = "account/fetching";
const RESOLVED = "account/resolved";
const REJECTED = "account/rejected";

const accountFetchingAction = () => ({ type: FETCHING });
const accountResolvedAction = (data) => ({ type: RESOLVED, payload: data });
const accountRejectedAction = (error) => ({ type: REJECTED, payload: error });

export async function fetchOrUpdateAccount(store) {
	const selectAccount = (state) => state.account;
	const status = selectAccount(store.getState()).status;
	if (status === "pending" || status === "updating") {
		return;
	}

	store.dispatch(accountFetchingAction());
	await axios
		.get(window.location.origin + "/account-data.json")
		.then((response) => {
			store.dispatch(accountResolvedAction(response.data));
		})
		.catch((error) => {
			store.dispatch(accountRejectedAction(error));
		});
}

export default function accountReducer(state = initialState, action) {
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
					draft.data = action.payload;
					draft.status = "resolved";
					return;
				}
				return;
			}
			case REJECTED: {
				if (draft.status === "pending" || draft.status === "updating") {
					draft.status = "rejected";
					draft.error = action.payload;
					draft.data = null;
					return;
				}
				return;
			}
			default:
				return;
		}
	});
}

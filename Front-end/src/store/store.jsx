import { createStore } from "redux";
import produce from "immer";

const initialState = {
	isConnected: false,
	baseURL: "http://localhost:3001/api/v1",
	userToken: null,
	userData: null,
};

const ISCONNECTED = "isConntected";
const BASEURL = "baseURL";
const USERDATA = "userData";
const USERTOKEN = "userToken";

export const isConnectedAction = (isConnected) => ({ type: ISCONNECTED, payload: isConnected });
export const userTokenAction = (userToken) => ({ type: USERTOKEN, payload: userToken });
export const userDataAction = (userData) => ({ type: USERDATA, payload: userData });

function reducer(state = initialState, action) {
	if (action.type === ISCONNECTED) {
		return produce(state, (draft) => {
			draft.isConnected = action.payload;
		});
	}
	if (action.type === BASEURL) {
		return state;
	}
	if (action.type === USERTOKEN) {
		return produce(state, (draft) => {
			draft.userToken = action.payload;
		});
	}
	if (action.type === USERDATA) {
		return produce(state, (draft) => {
			draft.userData = action.payload;
		});
	}
	return state;
}

export const store = createStore(reducer);

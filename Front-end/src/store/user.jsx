import produce from "immer";

const initialState = {
	isConnected: false,
	token: null,
	id: null,
	email: null,
	firstName: null,
	lastName: null,
	createdAt: null,
	updatedAt: null,
};

const ISCONNECTED = "isConntected";
const USERTOKEN = "userToken";
const USERDATA = "userData";
const USERRESET = "userReset";

export const isConnectedAction = (isConnected) => ({ type: ISCONNECTED, payload: isConnected });
export const userTokenAction = (userToken) => ({ type: USERTOKEN, payload: userToken });
export const userDataAction = (userData) => ({ type: USERDATA, payload: userData });
export const userResetAction = () => ({ type: USERRESET });

export default function userReducer(state = initialState, action) {
	if (action.type === ISCONNECTED) {
		return produce(state, (draft) => {
			draft.isConnected = action.payload;
		});
	}
	if (action.type === USERTOKEN) {
		return produce(state, (draft) => {
			draft.token = action.payload;
		});
	}
	if (action.type === USERDATA) {
		return produce(state, (draft) => {
			draft.id = action.payload.id;
			draft.email = action.payload.email;
			draft.firstName = action.payload.firstName;
			draft.lastName = action.payload.lastName;
			draft.createdAt = action.payload.createdAt;
			draft.updatedAt = action.payload.updatedAt;
		});
	}
	if (action.type === USERRESET) {
		return produce(state, (draft) => {
			draft.id = initialState.id;
			draft.email = initialState.email;
			draft.firstName = initialState.firstName;
			draft.lastName = initialState.lastName;
			draft.createdAt = initialState.createdAt;
			draft.updatedAt = initialState.updatedAt;
		});
	}
	return state;
}

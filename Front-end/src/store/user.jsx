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
const USERID = "userId";
const USEREMAIL = "userEmail";
const USERFIRSTNAME = "userFirstName";
const USERLASTNAME = "userLastName";
const USERCREATEDAT = "createdAt";
const USERUPDATEDAT = "updatedAt";
const USERDATA = "userData";
const USERRESET = "userReset";

export const isConnectedAction = (isConnected) => ({ type: ISCONNECTED, payload: isConnected });
export const userTokenAction = (userToken) => ({ type: USERTOKEN, payload: userToken });
export const userIdAction = (userId) => ({ type: USERID, payload: userId });
export const userEmailAction = (userEmail) => ({ type: USEREMAIL, payload: userEmail });
export const userFirstNameAction = (userFirstName) => ({ type: USERFIRSTNAME, payload: userFirstName });
export const userLastNameAction = (userLastName) => ({ type: USERLASTNAME, payload: userLastName });
export const userCreatedAtAction = (userCreatedAt) => ({ type: USERCREATEDAT, payload: userCreatedAt });
export const userUpdatedAtAction = (userUpdatedAt) => ({ type: USERUPDATEDAT, payload: userUpdatedAt });
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
		return initialState;
	}
	return state;
}

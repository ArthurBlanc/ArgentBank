import { createStore, combineReducers } from "redux";

import apiReducer from "./api";
import loginReducer from "./login";
import accountReducer from "./account";
import userReducer from "./user";

const reducer = combineReducers({
	api: apiReducer,
	login: loginReducer,
	account: accountReducer,
	user: userReducer,
});

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(reducer, reduxDevtools);

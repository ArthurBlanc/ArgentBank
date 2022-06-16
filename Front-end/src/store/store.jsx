import { configureStore } from "@reduxjs/toolkit";

import apiReducer from "./api";
import loginReducer from "./login";
import accountReducer from "./account";
import userReducer from "./user";

/* Creating a store with the reducers. */
const store = configureStore({
	reducer: {
		api: apiReducer,
		login: loginReducer,
		account: accountReducer,
		user: userReducer,
	},
});

export default store;

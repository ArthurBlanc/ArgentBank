import { createAction, createReducer } from "@reduxjs/toolkit";

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

export const isConnectedAction = createAction("isConnected");
export const userTokenAction = createAction("userToken");
export const userDataAction = createAction("userData");
export const userResetAction = createAction("userReset");

export default createReducer(initialState, (builder) =>
	builder
		.addCase(isConnectedAction, (draft, action) => {
			draft.isConnected = action.payload;
			return;
		})
		.addCase(userTokenAction, (draft, action) => {
			draft.token = action.payload;
			return;
		})
		.addCase(userDataAction, (draft, action) => {
			draft.id = action.payload.id;
			draft.email = action.payload.email;
			draft.firstName = action.payload.firstName;
			draft.lastName = action.payload.lastName;
			draft.createdAt = action.payload.createdAt;
			draft.updatedAt = action.payload.updatedAt;
			return;
		})
		.addCase(userResetAction, (draft) => {
			draft.isConnected = initialState.isConnected;
			draft.token = initialState.token;
			draft.id = initialState.id;
			draft.email = initialState.email;
			draft.firstName = initialState.firstName;
			draft.lastName = initialState.lastName;
			draft.createdAt = initialState.createdAt;
			draft.updatedAt = initialState.updatedAt;
			return;
		})
);

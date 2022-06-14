import { createReducer } from "@reduxjs/toolkit";

const initialState = {
	baseURL: "http://localhost:3001/api/v1",
};

export default createReducer(initialState, (builder) => builder);

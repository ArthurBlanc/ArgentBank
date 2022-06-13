const initialState = {
	baseURL: "http://localhost:3001/api/v1",
};

const BASEURL = "baseURL";

export default function apiReducer(state = initialState, action) {
	if (action.type === BASEURL) {
		return state;
	}
	return state;
}

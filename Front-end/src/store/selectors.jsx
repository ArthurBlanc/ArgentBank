export const selectBaseURL = () => {
	return (state) => state.api.baseURL;
};

export const selectIsConnected = () => {
	return (state) => state.user.isConnected;
};

export const selectUserToken = () => {
	return (state) => state.user.token;
};

export const selectUserId = () => {
	return (state) => state.user.id;
};

export const selectUserEmail = () => {
	return (state) => state.user.email;
};

export const selectUserFirstName = () => {
	return (state) => state.user.firstName;
};

export const selectUserLastName = () => {
	return (state) => state.user.lastName;
};

export const selectUserCreatedAt = () => {
	return (state) => state.user.createdAt;
};

export const selectUserUpdatedAt = () => {
	return (state) => state.user.updatedAt;
};

export const selectUserAccountData = (id) => {
	if (id === null) {
		return (state) => state;
	}
	return (state) => state.account.data.find((item) => item.userId === id);
};

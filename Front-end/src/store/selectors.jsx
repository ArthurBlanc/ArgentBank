export const selectBaseURL = () => {
	return (state) => state.api.baseURL;
};

export const selectLoginError = () => {
	return (state) => state.login.error;
};

export const selectIsConnected = () => {
	return (state) => state.user.isConnected;
};

export const selectUserToken = () => {
	return (state) => state.user.token;
};

export const selectUserStatus = () => {
	return (state) => state.user.status;
};

export const selectUserError = () => {
	return (state) => state.user.error;
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

export const selectAccountStatus = () => {
	return (state) => state.account.status;
};

export const selectAccountError = () => {
	return (state) => state.account.error;
};

export const selectUserAccountData = (id) => {
	return (state) => (state.account.data ? state.account.data.find((item) => item.userId === id) : null);
};

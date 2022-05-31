import React, { useState, createContext } from "react";

export const Context = createContext();

export const Provider = ({ children }) => {
	const [userToken, setUserToken] = useState(null);
	const [baseURL, setBaseURL] = useState("http://localhost:3001/api/v1");
	const [isConnected, setIsConnected] = useState(false);
	const [userData, setUserData] = useState(null);

	return (
		<Context.Provider
			value={{
				userToken,
				setUserToken,
				baseURL,
				setBaseURL,
				isConnected,
				setIsConnected,
				userData,
				setUserData,
			}}
		>
			{children}
		</Context.Provider>
	);
};

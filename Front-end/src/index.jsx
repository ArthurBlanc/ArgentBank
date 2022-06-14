import React from "react";
import { createRoot } from "react-dom/client";

import Router from "./Router";
import { Provider } from "react-redux";
import store from "./store/store";

import "./main.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
	<Provider store={store}>
		<React.StrictMode>
			<Router />
		</React.StrictMode>
	</Provider>
);

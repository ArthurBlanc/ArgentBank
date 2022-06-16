import React from "react";
import { createRoot } from "react-dom/client";

import Router from "./Router";
import { Provider } from "react-redux";
import store from "./store/store";

import "./main.scss";

const container = document.getElementById("root");
const root = createRoot(container);

/* Rendering the Provider component with the store and the Router component. */
root.render(
	<Provider store={store}>
		<React.StrictMode>
			<Router />
		</React.StrictMode>
	</Provider>
);

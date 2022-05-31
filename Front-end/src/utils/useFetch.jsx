import { useState, useEffect } from "react";

export function useFetch(urlAPI) {
	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	useEffect(() => {
		setLoading(true);
		async function fetchData(fetchURL) {
			try {
				const response = await fetch(fetchURL);
				const data = await response.json();
				setData(data);
			} catch (err) {
				console.log(err);
				setError(true);
			} finally {
				setLoading(false);
			}
		}
		fetchData(urlAPI);
	}, [urlAPI]);
	return { isLoading, data, error };
}

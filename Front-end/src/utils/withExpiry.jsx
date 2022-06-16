export const setWithExpiry = (key, value, TTL /*Time to Live*/) => {
	const now = new Date();
	const item = {
		value: value,
		expiry: now.getTime() + TTL,
	};
	localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = (key) => {
	const itemStr = localStorage.getItem(key);
	if (!itemStr) {
		return null;
	}
	const item = JSON.parse(itemStr);
	const now = new Date();
	if (now.getTime() > item.expiry) {
		localStorage.removeItem(key);
		return null;
	}
	return item.value;
};

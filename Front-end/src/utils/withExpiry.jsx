/**
 * It takes a key, a value, and a TTL (time to live) and sets the key/value pair in localStorage with
 * an expiry time
 * @param {String} key - String that will define the key of the localStorage data.
 * @param {String} value - String that will define the value of the localStorage data.
 * @param {Number} TTL - Number that will define the Time to live of the localStorage data.
 */
export const setWithExpiry = (key, value, TTL) => {
	const now = new Date();
	/* Creating an object with two properties, value and expiry. */
	const item = {
		value: value,
		/* Adding the current time to the TTL to get the expiry time. */
		expiry: now.getTime() + TTL,
	};
	/* Setting the key/value pair in localStorage. */
	localStorage.setItem(key, JSON.stringify(item));
};

/**
 * It gets the value of the key from localStorage, checks if the current time is greater than the
 * expiry time, and if it is, then it removes the item from localStorage and returns null. Otherwise,
 * it returns the value of the item.
 * @param {String} key - String the key to get in the localStorage data.
 * @returns The value of the item.
 */
export const getWithExpiry = (key) => {
	/* Getting the value of the key from localStorage. */
	const itemStr = localStorage.getItem(key);
	/* If the itemStr is not defined, then return null. */
	if (!itemStr) {
		return null;
	}
	/* Parsing the string into a JSON object. */
	const item = JSON.parse(itemStr);
	const now = new Date();
	/* Checking if the current time is greater than the expiry time. If it is, then it removes the item
	from localStorage and returns null. */
	if (now.getTime() > item.expiry) {
		localStorage.removeItem(key);
		return null;
	}
	/* Returning the value of the item. */
	return item.value;
};

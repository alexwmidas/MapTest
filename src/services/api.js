/**
 * Created by Evgenii
 */

function getAuthHeader() {
	return {
		"Content-Type": "application/json",
	}
}

export function getFavorites() {
	return fetch('https://appear.pl/pins.json', {
		method: 'GET',
		headers: getAuthHeader(),
	}).then((user) => {
		return user.json()
	}).catch((error) => {
		console.log(error);
	});
}

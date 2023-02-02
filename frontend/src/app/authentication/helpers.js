import jwtDecode from 'jwt-decode';

const TOKEN_KEYS = ['token'];

export const setToken = (token) => {
	sessionStorage.setItem(TOKEN_KEYS[0], token);
};

export const deleteToken = () => {
	TOKEN_KEYS.forEach((element) => {
		sessionStorage.removeItem(element);
	});
};

export const getToken = () => sessionStorage.getItem(TOKEN_KEYS[0]) || '';

export const getUser = () => {
	if (getToken()) {
		const token = jwtDecode(getToken());
		return token;
	}
	return null;
};

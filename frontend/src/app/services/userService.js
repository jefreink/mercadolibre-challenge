import axios from '../config/axios';

export const UserServices = (() => {
	const baseUrl = 'users';

	const getUserData = async () => {
		try {
			const userResponse = await axios.get(baseUrl);
			return userResponse.data;
		} catch (err) {
			return err.data;
		}
	};

	return {
		getUserData,
	};
})();

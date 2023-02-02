import axios from '../config/axios';

export const LoginServices = (() => {
	const signIn = async (data) => {
		try {
			const signInResponse = await axios.post('login', {
				...data,
			});
			return signInResponse.data;
		} catch (err) {
			return err.data;
		}
	};

	return {
		signIn,
	};
})();

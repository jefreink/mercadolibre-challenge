import { deleteToken, getToken } from './helpers';
import axios from '../config/axios';

export const AxiosInterceptor = () => {
	const keyValue = ['login'];
	const updateHeader = (request) => {
		const token = getToken();
		const newHeaders = {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		};
		request.headers = newHeaders;
		return request;
	};

	axios.interceptors.request.use((request) => {
		if (keyValue.includes(request.url)) return request;
		return updateHeader(request);
	});

	axios.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			if (
				(error.response && error.response.status === 401 && getToken()) ||
				error.code === 'ECONNABORTED'
			) {
				deleteToken();
				window.location.href = '/';
			}
			return Promise.reject(error);
		}
	);
};

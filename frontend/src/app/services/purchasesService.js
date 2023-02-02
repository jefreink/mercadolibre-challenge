import axios from '../config/axios';

export const PurchasesServices = (() => {
	const baseUrl = 'purchases';

	const getUserPurchases = async (query) => {
		try {
			const purchases = await axios.get(`${baseUrl}`, {
				params: query,
			});
			return purchases.data;
		} catch (err) {
			return err.data;
		}
	};

	const getDetailPurchase = async (idCompra) => {
		try {
			const detail = await axios.get(`${baseUrl}/${idCompra}`);
			return detail.data;
		} catch (err) {
			return err.data;
		}
	};

	return {
		getUserPurchases,
		getDetailPurchase,
	};
})();

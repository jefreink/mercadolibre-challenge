const mercadolibre = require('../config/db');
const mercadolibreService = mercadolibre.getMercadolibreService();

const getPayment = async (payment) => {
	try {
		const resmuenPurchase = await mercadolibreService.getPayment(payment);
		return resmuenPurchase;
	} catch (e) {
		return e;
	}
};

module.exports = { getPayment };

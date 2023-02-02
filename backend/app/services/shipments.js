const mercadolibre = require('../config/db');
const mercadolibreService = mercadolibre.getMercadolibreService();

const getShipment = async (payment) => {
	try {
		const resmuenShipment = await mercadolibreService.getShipment(payment);
		return resmuenShipment;
	} catch (e) {
		return e;
	}
};

module.exports = { getShipment };

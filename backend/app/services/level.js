const mercadolibre = require('../config/db');
const mercadolibreService = mercadolibre.getMercadolibreService();

const getDetailLevel = async (level) => {
	try {
		const detailLevel = await mercadolibreService.getLevel(level);
		return detailLevel;
	} catch (e) {
		return e;
	}
};

module.exports = { getDetailLevel };

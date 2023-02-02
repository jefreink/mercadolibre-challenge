const MercadolibreService = require('./database/MercadolibreService');

const getMercadolibreService = () => {
	return new MercadolibreService();
};

module.exports = {
	getMercadolibreService,
};

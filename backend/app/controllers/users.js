const { httpError } = require('../helpers/handleError');
const mercadolibre = require('../config/db');
const mercadolibreService = mercadolibre.getMercadolibreService();
const { getDetailLevel } = require('../services/level');

const getUser = async (req, res) => {
	let restrictions = [];
	let nivel = {};

	try {
		const user = await mercadolibreService.getUser();
		if (user) {
			try {
				restrictions = await utilGetRestrictions(user.id_usuario);
				nivel = await getDetailLevel(user.nivel);
			} catch (e) {
				httpError(res, e);
			}
		}

		res.status(200).json({
			status: 'success',
			data: {
				...user,
				restrictions,
				nivel,
			},
		});
	} catch (e) {
		httpError(res, e);
	}
};

const utilGetRestrictions = async (id) => {
	try {
		const restrictions = await mercadolibreService.getUserRestrictions(id);
		return restrictions;
	} catch (e) {
		return e;
	}
};

module.exports = {
	getUser,
};

const { httpError } = require('../helpers/handleError');
const mercadolibre = require('../config/db');
const mercadolibreService = mercadolibre.getMercadolibreService();
const { getPayment } = require('../services/payments');
const { getShipment } = require('../services/shipments');

const getUserPurchases = async (req, res) => {
	const { limit, offset } = req.query;
	const { _id } = req.decoded;

	let purchases = {};

	try {
		purchases = await mercadolibreService.getUserPurchases(_id, limit, offset);
		const resmuenPurchase = await addDetailPaymentShipment(purchases, _id);

		const resumen = {
			...purchases,
			data: resmuenPurchase,
		};

		res.status(200).json({
			status: 'success',
			data: resumen,
		});
	} catch (error) {
		httpError(res, error);
	}
};

const getDetailPurchase = async (req, res) => {
	const { id } = req.params;
	const { _id } = req.decoded;
	let purchases = {};

	try {
		purchases = await mercadolibreService.getUserPurchases(_id);
		const resmuenPurchase = await utilDetailShipment(purchases, Number(id));

		res.status(200).json({
			status: 'success',
			data: resmuenPurchase,
		});
	} catch (error) {
		httpError(res, error);
	}
};

const addDetailPaymentShipment = async (purchases) => {
	const { data } = purchases;
	const newArray = [];
	for (const value of data) {
		const payment = await getPayment(value.id_transaccion);
		const shipment = await getShipment(value.id_envio);
		newArray.push({
			...value,
			payment,
			shipment,
		});
	}
	return newArray;
};

const utilDetailShipment = async (purchases, id_compra) => {
	const { data } = purchases;

	const compra = data.filter((e) => e.id_compra === id_compra);
	if (compra.length > 0) {
		return {
			...compra[0],
			payment: await getPayment(compra[0].id_transaccion),
			shipment: await getShipment(compra[0].id_envio),
		};
	}
	return [];
};

module.exports = {
	getUserPurchases,
	getDetailPurchase,
};

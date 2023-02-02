// istanbul ignore file

/**
 * - Todos estos métodos son asíncronos.
 * - Te recomendamos no modificar estos archivos ya que usaremos una copia para validar el funcionamiento
 * - Si tenés algún problema o pregunta, no dudes en contactar al entrevistador!
 */

const MockUtils = require('./mocks');

class MercadolibreService {
	constructor() {
		this.mockUtils = new MockUtils();
	}

	getUser() {
		return this.mockUtils.getUser();
	}

	getUserRestrictions(userId) {
		return this.mockUtils.getUserRestrictions(userId);
	}

	async getUserPurchases(userId, limit = 10, offset = 0) {
		const purchases = await this.mockUtils.getUserPurchases(userId);
		if (offset >= purchases.length) {
			const error = new Error('Bad request');
			error.status = 400;
			throw error;
		}
		return {
			total: purchases.length,
			offset,
			limit,
			data: purchases.slice(offset, limit * (offset + 1)),
		};
	}

	getLevel(levelId) {
		return this.mockUtils.getLevel(levelId);
	}

	getShipment(shipmentId) {
		return this.mockUtils.getShipment(shipmentId);
	}

	getPayment(paymentId) {
		return this.mockUtils.getPayment(paymentId);
	}
}

module.exports = MercadolibreService;

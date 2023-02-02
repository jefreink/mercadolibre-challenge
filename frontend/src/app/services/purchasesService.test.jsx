import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { PurchasesServices } from './purchasesService';
import { setupServer } from 'msw/node';
import { mockPurchaseDetails, mockPurchases } from '../mocks/mocks';
import { rest } from 'msw';

export const server = setupServer(
	rest.get('http://localhost:4000/api/v1/purchases', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(mockPurchases));
	}),
	rest.get('http://localhost:4000/api/v1/purchases/:id', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(mockPurchaseDetails));
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('PurchasesServices', () => {
	it('getUserPurchases respuesta exitosa', async () => {
		const response = {
			data: [
				{
					cantidad: 3,
					fecha: '2022-07-25T10:23:18.000-03:00',
					id_compra: 123,
					id_envio: 123434,
					id_transaccion: 12345,
					imagen: 'imagen',
					payment: { id_transaccion: 1123, estado: 'rechazada' },
					precio: { total: 1223, moneda: 'moneda' },
					shipment: { id_envio: 123, estado: 'cancelado' },
					titulo: 'Celular LG K40',
					vendedor: { id: 123, nickname: 'nickname' },
				},
			],
			limit: '5',
			offset: '0',
			total: 10,
			status: 'success',
		};
		const res = await PurchasesServices.getUserPurchases();
		expect(res).toEqual(response);
	});

	it('getUserPurchases respuesta negativa', async () => {
		server.use(
			rest.get('http://localhost:4000/api/v1/purchases', (req, res, ctx) => {
				return res(ctx.status(403), ctx.json({ data: 'hubo un problema' }));
			})
		);
	});

	it('getDetailPurchase respuesta exitosa', async () => {
		const response = {
			data: [
				{
					cantidad: 3,
					fecha: '2022-07-25T10:23:18.000-03:00',
					id_compra: 123,
					id_envio: 123434,
					id_transaccion: 12345,
					imagen: 'imagen',
					payment: { id_transaccion: 1123, estado: 'rechazada' },
					precio: { total: 1223, moneda: 'moneda' },
					shipment: { id_envio: 123, estado: 'cancelado' },
					titulo: 'Celular LG K40',
					vendedor: { id: 123, nickname: 'nickname' },
				},
			],
			status: 'success',
		};
		const res = await PurchasesServices.getDetailPurchase();
		expect(res).toEqual(response);
	});

	it('getDetailPurchase respuesta negativa', async () => {
		server.use(
			rest.get('http://localhost:4000/api/v1/purchases/1', (req, res, ctx) => {
				return res(ctx.status(403), ctx.json({ data: 'hubo un problema' }));
			})
		);
	});
});

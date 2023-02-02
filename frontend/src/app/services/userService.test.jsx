import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { mockGetUserData } from '../mocks/mocks';
import { rest } from 'msw';
import { UserServices } from './userService';

export const server = setupServer(
	rest.get('http://localhost:4000/api/v1/users', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(mockGetUserData));
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('LoginServices', () => {
	it('getUserData respuesta exitosa', async () => {
		const response = {
			data: { id_usuario: 1, nombre: 'Mercadolibre', apellido: 'User' },
			apellido: 'User',
			id_usuario: 1,
			imagen:
				'https://http2.mlstatic.com/frontend-assets/ui-navigation/5.19.1/mercadolibre/180x180.png',
			nivel: { id_nivel: 'ORO', descripción: 'Nivel Oro - Mercadopuntos' },
			nombre: 'Mercadolibre',
			restrictions: [
				{
					tipo: 'warning',
					mensaje: 'Tu cuenta no ha sido verificada aún. Revisa tu mail',
				},
			],
			status: 'success',
		};

		const res = await UserServices.getUserData();
		expect(res).toEqual(response);
	});

	it('getUserData respuesta negativa', async () => {
		server.use(
			rest.get('http://localhost:4000/api/v1/users', (req, res, ctx) => {
				return res(ctx.status(403), ctx.json({ error: 'hubo un problema' }));
			})
		);
	});
});

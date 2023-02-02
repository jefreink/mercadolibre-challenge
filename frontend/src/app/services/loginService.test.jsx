import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { mockSignIn } from '../mocks/mocks';
import { rest } from 'msw';
import { LoginServices } from './loginService';

export const server = setupServer(
	rest.post('http://localhost:4000/api/v1/login', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(mockSignIn));
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('LoginServices', () => {
	it('signIn respuesta exitosa', async () => {
		const response = {
			tokenSession: 'dt378td732td873dt7382d837dt873t2387',
		};
		const res = await LoginServices.signIn();
		expect(res).toEqual(response);
	});

	it('signIn respuesta negativa', async () => {
		server.use(
			rest.get('http://localhost:4000/api/v1/login', (req, res, ctx) => {
				return res(ctx.status(403), ctx.json({ error: 'hubo un problema' }));
			})
		);
	});
});

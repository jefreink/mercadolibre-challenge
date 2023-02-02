import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Provider from '../../application/Provider';
import Purchases from './Purchases';

const resp = { data: { total: 10, data: { id_compra: 1 } } };
describe('Purchases', () => {
	it('Renderiza el componente', () => {
		const state = { loading: true };
		const { total, data } = resp.data;
		render(
			<Provider value={[state, vi.fn()]}>
				<Purchases total={total} data={data} />
			</Provider>
		);
	});

	it('Renderiza el componente 2', () => {
		const state = { loading: true };
		const { total, data } = resp.data;
		const component = render(
			<Provider value={[state, vi.fn()]}>
				<Purchases total={total} data={data} />
			</Provider>
		);

		expect(component.getByText('Cargando tus compras...')).toBeDefined();
	});
});

import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import Provider from '../../application/Provider';
import Navbar from './Navbar';

vi.mock('react-router-dom', () => ({
	useNavigate: () => ({
		navigate: vi.fn().mockImplementation(() => ({ path: 'route' })),
	}),
}));

describe('Navbar', () => {
	it('Renderiza componente', () => {
		render(
			<Provider>
				<Navbar />
			</Provider>
		);
	});
});

import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import LoginView from './Login';
import Provider from '../../application/Provider';

vi.mock('react-router-dom', () => ({
	useNavigate: () => ({
		navigate: vi.fn().mockImplementation(() => ({ path: 'route' })),
	}),
}));

describe('LoginView', () => {
	it('Renderiza componente', () => {
		render(
			<Provider>
				<LoginView />
			</Provider>
		);
	});
});

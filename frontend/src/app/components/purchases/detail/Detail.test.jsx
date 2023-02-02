import { render } from '@testing-library/react';
import { describe } from 'vitest';
import Detail from './Detail';

vi.mock('react-router-dom', () => ({
	useNavigate: () => ({
		navigate: vi.fn().mockImplementation(() => ({ path: 'route' })),
	}),
}));

describe('Detail', () => {
	test('Renderiza el componente', () => {
		render(<Detail />);
	});
});

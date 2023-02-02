import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import Provider from '../../../application/Provider';
import Information from './Information';

const mockUser = {
	nivel: { id_nivel: 'Plata' },
};

describe('Information', () => {
	it('Renderiza componente', () => {
		render(
			<Provider>
				<Information user={mockUser} />
			</Provider>
		);
	});
});

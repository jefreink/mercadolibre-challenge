import { render } from '@testing-library/react';
import { describe } from 'vitest';
import Provider from '../../../application/Provider';
import Loading from './Loading';

describe('Loading', () => {
	it('Renderiza el componente', () => {
		render(
			<Provider>
				<Loading />
			</Provider>
		);
	});
});

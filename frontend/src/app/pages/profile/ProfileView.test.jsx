import { render } from '@testing-library/react';
import { describe } from 'vitest';
import Provider from '../../application/Provider';
import ProfileView from './ProfileView';

describe('ProfileView', () => {
	test('Renderiza el componente', () => {
		render(
			<Provider>
				<ProfileView />
			</Provider>
		);
	});
});

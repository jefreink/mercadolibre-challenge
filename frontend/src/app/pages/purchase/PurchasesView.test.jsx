import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import Provider from '../../application/Provider';
import PurchasesView from './PurchaseView';

describe('PurchasesView', () => {
	it('Renderiza el componente', () => {
		render(
			<Provider>
				<PurchasesView />
			</Provider>
		);
	});
});

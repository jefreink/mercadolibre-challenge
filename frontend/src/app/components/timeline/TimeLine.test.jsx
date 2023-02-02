import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import TimeLine from './TimeLine';

describe('TimeLine', () => {
	const transaction = { step: 1 };
	it('Renderiza el componente', () => {
		render(<TimeLine transaction={transaction} />);
	});
});

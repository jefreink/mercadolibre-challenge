import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import CustomPagination from './Pagination';

describe('CustomPagination', () => {
	it('Renderiza componente', () => {
		render(<CustomPagination />);
	});
});

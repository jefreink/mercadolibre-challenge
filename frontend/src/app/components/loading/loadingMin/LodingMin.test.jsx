import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import LoadingMin from './LoadingMin';

describe('LoadingMin', () => {
	test('Renderiza el componente', () => {
		render(<LoadingMin text='' />);
	});

	it('Renderiza un mensaje por defecto si no viene el prop', () => {
		const text = 'Cargardon información...';
		const component = render(<LoadingMin text='' />);
		component.getByText(text);
	});

	it('Renderiza el mensaje que viene por prop', () => {
		const text = 'Esto es tun test';
		const component = render(<LoadingMin text='Esto es tun test' />);
		component.getByText(text);
	});
});

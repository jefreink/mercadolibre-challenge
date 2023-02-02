export const mockPurchases = {
	data: [
		{
			cantidad: 3,
			fecha: '2022-07-25T10:23:18.000-03:00',
			id_compra: 123,
			id_envio: 123434,
			id_transaccion: 12345,
			imagen: 'imagen',
			payment: { id_transaccion: 1123, estado: 'rechazada' },
			precio: { total: 1223, moneda: 'moneda' },
			shipment: { id_envio: 123, estado: 'cancelado' },
			titulo: 'Celular LG K40',
			vendedor: { id: 123, nickname: 'nickname' },
		},
	],
	limit: '5',
	offset: '0',
	total: 10,
	status: 'success',
};

export const mockPurchaseDetails = {
	data: [
		{
			cantidad: 3,
			fecha: '2022-07-25T10:23:18.000-03:00',
			id_compra: 123,
			id_envio: 123434,
			id_transaccion: 12345,
			imagen: 'imagen',
			payment: { id_transaccion: 1123, estado: 'rechazada' },
			precio: { total: 1223, moneda: 'moneda' },
			shipment: { id_envio: 123, estado: 'cancelado' },
			titulo: 'Celular LG K40',
			vendedor: { id: 123, nickname: 'nickname' },
		},
	],
	status: 'success',
};

export const mockSignIn = {
	tokenSession: 'dt378td732td873dt7382d837dt873t2387',
};

export const mockGetUserData = {
	data: { id_usuario: 1, nombre: 'Mercadolibre', apellido: 'User' },
	apellido: 'User',
	id_usuario: 1,
	imagen:
		'https://http2.mlstatic.com/frontend-assets/ui-navigation/5.19.1/mercadolibre/180x180.png',
	nivel: { id_nivel: 'ORO', descripción: 'Nivel Oro - Mercadopuntos' },
	nombre: 'Mercadolibre',
	restrictions: [
		{
			tipo: 'warning',
			mensaje: 'Tu cuenta no ha sido verificada aún. Revisa tu mail',
		},
	],
	status: 'success',
};

const httpError = (res, err) => {
	console.log(err);
	res.status(500);
	res.send({ error: 'Hubo un problema en la petición' });
};

module.exports = { httpError };

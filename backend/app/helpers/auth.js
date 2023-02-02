const { verifyToken } = require('../helpers/generateToken');

const checkAuth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ').pop();
		const tokenData = await verifyToken(token);
		if (tokenData._id) {
			next();
		} else {
			res.status(409);
			res.send({ error: 'Token invalido' });
		}
	} catch (e) {
		res.status(409);
		res.send({ error: 'Token invalido' });
	}
};

module.exports = checkAuth;

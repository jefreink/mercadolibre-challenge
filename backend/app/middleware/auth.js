const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
	const token = req.headers.authorization.split(' ').pop();
	if (!token) {
		res.status(403).send({ error: 'Token no proporcionado' });
	} else {
		jwt.verify(token, secret, (err, decoded) => {
			if (err) {
				res.status(401).send({ error: 'Token inválido' });
			} else {
				req.decoded = decoded;
				next();
			}
		});
	}
}

module.exports = { verifyToken };

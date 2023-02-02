const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const tokenSign = async (user) => {
	return jwt.sign(
		{
			...user,
		},
		secret,
		{
			expiresIn: '1h',
		}
	);
};

const verifyTokenAuth = async (token, res) => {
	try {
		return jwt.verify(token, secret);
	} catch (e) {
		return null;
	}
};

const decodeSign = (token) => {
	return jwt.decode(token, null);
};

const isExpired = (token) => {
	if (token && jwt.decode(token)) {
		const expiry = jwt.decode(token).exp;
		const now = new Date();
		return now.getTime() > expiry * 1000;
	}
	return false;
};

module.exports = { tokenSign, decodeSign, verifyTokenAuth, isExpired };

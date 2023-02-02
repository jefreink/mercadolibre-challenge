const { httpError } = require('../helpers/handleError');
const { tokenSign } = require('../helpers/generateToken');
const { compare } = require('../helpers/handleBcrypt');
data = require('../config/database/datas.json');

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = data.find((e) => e.email === email);

		if (!user) {
			res.status(404).send({ error: 'Usuario no encontrado' });
		}

		const checkPassword = await compare(password, user.password);

		const tokenSession = await tokenSign(user);

		if (password === user.password) {
			res.status(200).json({ tokenSession });
			return;
		}

		if (!checkPassword) {
			res.status(409);
			res.send({
				error: 'Credenciales inválidas',
			});
			return;
		}
	} catch (e) {
		httpError(res, e);
	}
};

module.exports = { login };

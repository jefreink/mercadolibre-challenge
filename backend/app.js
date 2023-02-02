require('dotenv').config();
const express = require('express');
const cors = require('cors');

const rutas = require('./app/routes');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', rutas);
app.listen(PORT, () => {
	console.log('API se encuentra en el puerto ', PORT);
});

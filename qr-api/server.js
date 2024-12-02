const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const qrRoutes = require('./routes/qr/Routes'); // Asegúrate de que esta ruta sea correcta

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Rutas
app.use('/api/qr', qrRoutes);

// Iniciar el servidor
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

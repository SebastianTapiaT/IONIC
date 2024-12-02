const express = require('express');
const db = require('../../db/database'); // Ajustar la ruta al archivo database.js

const router = express.Router();

// Ruta para guardar datos escaneados
router.post('/save', (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ message: 'El campo "data" es obligatorio.' });
  }

  const query = `INSERT INTO qrdata (data) VALUES (?)`;
  db.run(query, [data], function (err) {
    if (err) {
      res.status(500).json({ message: 'Error al guardar los datos.', error: err.message });
    } else {
      res.status(201).json({ message: 'Datos guardados exitosamente.', id: this.lastID });
    }
  });
});

// Ruta para obtener todos los datos escaneados
router.get('/', (req, res) => {
  const query = `SELECT * FROM qrdata ORDER BY scannedAt DESC`;

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ message: 'Error al obtener los datos.', error: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
});

module.exports = router;

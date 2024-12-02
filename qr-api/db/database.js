const sqlite3 = require('sqlite3').verbose();

// Ruta relativa correcta para el archivo SQLite
const db = new sqlite3.Database('./db/qrdata.db', (err) => {
  if (err) {
    console.error('Error al conectar con SQLite:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite.');
  }
});

// Crear tabla si no existe
db.run(
  `CREATE TABLE IF NOT EXISTS qrdata (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT NOT NULL,
    scannedAt TEXT DEFAULT CURRENT_TIMESTAMP
  )`,
  (err) => {
    if (err) {
      console.error('Error al crear la tabla:', err.message);
    } else {
      console.log('Tabla "qrdata" verificada o creada correctamente.');
    }
  }
);

module.exports = db;

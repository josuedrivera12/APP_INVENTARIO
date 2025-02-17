require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const reporteRoutes = require('./routes/reporteRoutes');
const excelRoutes = require('./routes/excelRoutes');
const verificarToken = require('./middleware/verificarToken');

const app = express();

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:3001'  // Ajusta esto si el frontend está en otro puerto/dominio
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Usar rutas
app.use('/auth', authRoutes);
app.use('/reportes', verificarToken, reporteRoutes);  // Verificar JWT antes de acceder a reportes
app.use('/excel', excelRoutes);

// Ruta raíz para verificar que el servidor está corriendo
app.get('/', (req, res) => {
  res.send('🚀 Servidor funcionando correctamente');
});

// Iniciar servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});

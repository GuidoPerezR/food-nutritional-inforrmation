import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 3001;

// Habilitar CORS para cualquier origen
app.use(cors());

// Ruta proxy
app.get('/api/fruit', async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Falta el parámetro "name"' });
  }

  const apiUrl = `https://fruit-track.onrender.com/fruit-info/?fruit=${encodeURIComponent(name)}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener datos desde el API externo',
      detalles: error.message
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor proxy corriendo en http://localhost:${PORT}`);
});

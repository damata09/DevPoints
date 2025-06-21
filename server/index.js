const express = require('express');
const app = express();
const usuarioRoutes = require('./routes/usuarioRoutes');
require('dotenv').config();

app.use(express.json());
app.use('/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  const cors = require('cors');
app.use(cors());
});
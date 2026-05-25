require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/books', bookRoutes);
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

const port = 3000;
const rotaDosCarros = require('./routes/carro');
app.use('/carro', rotaDosCarros);

const rotaDosUsuarios = require('./routes/usuario');
app.use('/usuario', rotaDosUsuarios);

app.get('/', (_, res) => {
  res.send({ message: '🚀 ~ api está em órbita!' });
});

app.listen(port, () => {
  console.log(`🚀 ~ api decolandou em http://localhost:${port}`);
});
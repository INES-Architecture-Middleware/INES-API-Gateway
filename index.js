const express = require('express');
require('express-group-routes');
const cors = require('cors');
const { initUserRoutes } = require('./user.js');
const { initPokemonRoutes } = require('./pokemon.js');
// const { createProxyMiddleware } = require('http-proxy-middleware');

require('dotenv').config()

const app = express();
const port = 3030;

app.use(express.json());

// const pokemonProxy = createProxyMiddleware({
//   target: process.env.POKEMON_MS_API_URL || 'http://localhost:3000',
//   changeOrigin: true,
// });

// app.use('/pokemon', pokemonProxy);

const pokemonMicroserviceURL = process.env.POKEMON_MS_API_URL || 'http://localhost:3000';
const userMicroserviceURL = process.env.USER_MS_API_URL || 'http://localhost:3001';
const teamMicroserviceURL = process.env.TEAM_MS_API_URL || 'http://localhost:3002';

app.use(cors({
    origin: ['http://localhost:3008'],
    credentials: true,
  }))
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

initPokemonRoutes(app, pokemonMicroserviceURL);
initUserRoutes(app, userMicroserviceURL);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
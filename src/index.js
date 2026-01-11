const express = require('express');
require('express-group-routes');
const cors = require('cors');
const { initUserRoutes } = require('./user.js');
const { initPokemonRoutes } = require('./pokemon.js');
const { initTeamRoutes } = require('./team.js');
// const { createProxyMiddleware } = require('http-proxy-middleware');

(async () => {
    require('dotenv').config()

    const app = express();
    const port = process.env.PORT || 3130;

    app.use(express.json());

    const pokemonMicroserviceURL = process.env.POKEMON_MS_API_URL || 'http://localhost:3000';
    const userMicroserviceURL = process.env.USER_MS_API_URL || 'http://localhost:3001';
    const teamMicroserviceURL = process.env.TEAM_MS_API_URL || 'http://localhost:3003';

    app.use(cors({
        origin: [process.env.CLIENT_URL || 'http://localhost:3125'],
        credentials: true,
    }))

    app.use(express.json());

    initPokemonRoutes(app, pokemonMicroserviceURL);
    initUserRoutes(app, userMicroserviceURL);
    initTeamRoutes(app, teamMicroserviceURL);

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})()
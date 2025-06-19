const express = require('express');
require('express-group-routes');
const cors = require('cors');

const app = express();
const port = 3030;

const pokemonMicroserviceURL = process.env.POKEMON_MS_API_URL || 'http://localhost:3000';


app.use(cors({
    origin: ['http://localhost:3008'],
    credentials: true,
  }))
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/pokemon', async (req, res) => {
    try {
        const response = await fetch(`${pokemonMicroserviceURL}/pokemon/all`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.get('/pokemon/:id', async (req, res) => {
    const pokemonId = req.params.id;
    try {
        const response = await fetch(`${pokemonMicroserviceURL}/pokemon/${pokemonId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(`Error fetching Pokemon with ID ${pokemonId}:`, error);
    }
    res.status(500).send('Internal Server Error');
});

// app.group('/user', (router) => {
//     router.post('/login', (req, res) => {
//         console.log(`Username : ${req.query.username}, Password : ${req.query.password}`);
//         res.send('Not implemented yet');
//     });
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
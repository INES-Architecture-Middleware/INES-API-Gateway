const initPokemonRoutes = (app, pokemonMicroserviceURL) => {
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

    app.post('/pokemon/filter/:pageId', async (req, res) => {
        try {
            const response = await fetch(`${pokemonMicroserviceURL}/pokemon/filter/${req.params.pageId}`, {method: "POST"});
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response)
            const data = await response.json();
            res.json(data);
        } catch (error) {
            console.error('Error fetching Pokemon data:', error);
            res.status(500).send('Internal Server Error');
        }
    })
}

module.exports = { initPokemonRoutes };
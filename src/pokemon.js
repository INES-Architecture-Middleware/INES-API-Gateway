const {requestDetails} = require('./middleware/auth')
const Requests = require('./utils/Requests')

const initPokemonRoutes = (app, pokemonMicroserviceURL) => {
    const requests = new Requests(pokemonMicroserviceURL)
    
    app.get('/pokemon', requestDetails, async (req, res) => {
        try {
            const response = await requests.get(`/pokemon/all`)
            res.json(response);
            return
        } catch (error) {
            console.error('Error fetching Pokemon data:', error);
            res.sendStatus(500)
            return
        }
    })

    app.get('/pokemon/:id', requestDetails, async (req, res) => {
        try {
            const pokemonId = req.params.id;
            const response = await requests.get(`/pokemon/${pokemonId}`)
            res.json(response)
            return
        } catch (error) {
            console.error(`Error fetching Pokemon with ID ${pokemonId}:`, error);
            res.sendStatus(500)
            return
        }
    });

    app.post('/pokemon/filter/:pageId', requestDetails, async (req, res) => {
        try {
            const response = await requests.post(`/pokemon/filter/${req.params.pageId}`, JSON.stringify(req.body))
            res.json(response);
            return
        } catch (error) {
            console.error('Error fetching Pokemon data:', error);
            res.sendStatus(500)
            return
        }
    })
}

module.exports = { initPokemonRoutes };
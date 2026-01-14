const { authenticateJWT, requestDetails } = require('./middleware/auth')
const Requests = require('./utils/Requests')

const initUserRoutes = (app, userMicroserviceURL) => {
    const requests = new Requests(userMicroserviceURL)

    // Connexions routes

    app.get('/logout', requestDetails, authenticateJWT, async (req, res) => {
        try {
            await requests.get("/user/logout", false)
            res.sendStatus(200)
            return
        } catch (error) {
            console.error('Error logging out user:', error);
            res.sendStatus(500);
            return
        }
    });

    app.post('/login', requestDetails, async (req, res) => {
        try {
            const data = await requests.post(`/user/login`, JSON.stringify(req.body))
            res.json(data)
            return
        } catch (error) {
            console.error('Error logging in user:', error);
            res.sendStatus(500);
            return
        }
    });

    app.post('/register', requestDetails, async (req, res) => {
        try {
            const data = await requests.post(`/user/register`, JSON.stringify(req.body))
            res.json(data)
            return
        } catch (error) {
            console.error('Error logging in user:', error);
            res.sendStatus(500)
            return
        }
    });

    // Users routes

    app.get('/me', requestDetails, authenticateJWT, async (req, res) => {
        try {
            const data = await requests.get(`/user/${req.user}`)
            res.json(data)
            return
        } catch (error) {
            console.error(`Error fetching user with ID ${req.user}:`, error);
            res.sendStatus(500)
            return
        }
    })

    app.post('/user', requestDetails, authenticateJWT, async (req, res) => {
        try {
            const data = await requests.post(`/user`, JSON.stringify(req.body))
            res.json(data)
            return
        } catch (error) {
            console.error('Error creating user:', error);
            res.sendStatus(500)
            return
        }
    });

    app.get('/user', requestDetails, authenticateJWT, async (req, res) => {
        try {
            const data = await requests.get(`/user`)
            res.json(data)
            return
        } catch (error) {
            console.error('Error fetching users:', error);
            res.sendStatus(500)
            return
        }
    });

    app.get('/user/:id', requestDetails, authenticateJWT, async (req, res) => {
        try {
            const data = await requests.get(`/user/${req.params.id}`)
            res.json(data)
            return
        } catch (error) {
            console.error(`Error fetching user with ID ${req.params.id}:`, error);
            res.sendStatus(500)
            return
        }
    });

    app.put('/user/:id', requestDetails, authenticateJWT, async (req, res) => {
        try {
            const data = await requests.put(`/user/${req.params.id}`, JSON.stringify(req.body))
            res.json(data)
            return
        } catch (error) {
            console.error(`Error updating user with ID ${req.params.id}:`, error);
            res.sendStatus(500)
            return
        }
    });

    app.delete('/user/:id', requestDetails, authenticateJWT, async (req, res) => {        
        try {
            const data = await requests.delete(`/user/${req.params.id}`)
            res.sendStatus(204)
            return
        } catch (error) {
            console.error(`Error deleting user with ID ${req.params.id}:`, error);
            res.sendStatus(500)
            return
        }
    })
}

module.exports = { initUserRoutes };
const { authenticateJWT, requestDetails } = require("./middleware/auth");
const Requests = require("./utils/Requests");

const initTeamRoutes = (app, teamMicroserviceURL) => {
    const requests = new Requests(teamMicroserviceURL)
    
    app.put('/team', requestDetails, authenticateJWT, async (req, res) => {
        try{
            const data = await requests.put(`/team`, JSON.stringify(req.body))
            res.json(data)
            return
        }catch(error){
            console.error("Error updating team:", error);
            res.sendStatus(500)
            return
        }
    });

    app.get("/team", requestDetails, authenticateJWT, async (req, res) => {
        try{
            const userId = req.query.userId;
            const data = await requests.get(`/team?userId=${userId}`)
            res.json(data)
            return
        }catch(error){
            console.error("Error getting teams:", error);
            res.sendStatus(500)
            return
        }
    });

    app.get("/team/:id", requestDetails, authenticateJWT, async (req, res) => {
        try{
            const userId = req.query.userId;
            const data = await requests.get(`/team/${req.params.id}`)
            res.json(data)
            return
        }catch(error){
            console.error("Error getting team:", error);
            res.sendStatus(500)
            return
        }
    });

    app.delete('/team/:id', requestDetails, authenticateJWT, async (req, res) => {
        try{
            const data = await requests.delete(`/team/${req.params.id}`)
            res.sendStatus(204)
            return
        }catch(error){
            console.error("Error deleting team:", error);
            res.sendStatus(500)
            return
        }
    })

    app.post("/team", requestDetails, authenticateJWT, async (req, res) => {
        try{
            const data = await requests.post(`/team`, JSON.stringify(req.body))
            res.json(data)
            return
        }catch(error){
            console.error("Error updating team:", error);
            res.sendStatus(500)
            return
        }
    });
}

module.exports = { initTeamRoutes };
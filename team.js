const initTeamRoutes = (app, teamMicroserviceURL) => {
    app.put('/team', async (req, res) => {
        try {
            const response = await fetch(`${teamMicroserviceURL}/team`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(req.body),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            res.json(data);
        } catch (error) {
            console.error('Error creating team:', error);
            res.status(500).send('Internal Server Error');
        }
    });

    app.get("/team", async (req, res) => {
        try {
            console.log(req.body);
          
        const response = await fetch(`${teamMicroserviceURL}/team`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        //   body: JSON.stringify(req.body),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        res.json(data);
      } catch (error) {
        console.error("Error creating team:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    app.delete('/team/:id', async (req, res) => {
        try {
            const response = await fetch(`${teamMicroserviceURL}/team/${req.params.id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            res.status(204).send(); 
        } catch (error) {
            console.error(`Error deleting team with ID ${req.params.id}:`, error);
            res.status(500).send('Internal Server Error');
        }
    })
}

module.exports = { initTeamRoutes };
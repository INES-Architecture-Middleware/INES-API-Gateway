const initUserRoutes = (app, userMicroserviceURL) => {
    app.post('/user', async (req, res) => {
        try {
            const response = await fetch(`${userMicroserviceURL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req.body),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            res.json(data);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Internal Server Error');
        }
    });

    app.delete('/user/:id', async (req, res) => {
        try {
            const response = await fetch(`${userMicroserviceURL}/${req.params.id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            res.status(204).send(); 
        } catch (error) {
            console.error(`Error deleting user with ID ${req.params.id}:`, error);
            res.status(500).send('Internal Server Error');
        }
    })

    // app.user('')
}

module.exports = { initUserRoutes };
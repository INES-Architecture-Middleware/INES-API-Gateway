const initUserRoutes = (app, userMicroserviceURL) => {
    app.post('/user', async (req, res) => {
        try {
            console.log('Creating user with data:', req.body);
        
            const response = await fetch(`${userMicroserviceURL}/user`, {
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

    app.get('/user', async (req, res) => {
        try {
            const response = await fetch(`${userMicroserviceURL}/user`, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            res.json(data);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).send('Internal Server Error');
        }
    });

    app.get('/user/:id', async (req, res) => {
        try {
            const response = await fetch(`${userMicroserviceURL}/user/${req.params.id}`, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            res.json(data);
        } catch (error) {
            console.error(`Error fetching user with ID ${req.params.id}:`, error);
            res.status(500).send('Internal Server Error');
        }
    });

    app.put('/user/:id', async (req, res) => {
        try {
            const response = await fetch(`${userMicroserviceURL}/user/${req.params.id}`, {
                method: 'PUT',
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
            console.error(`Error updating user with ID ${req.params.id}:`, error);
            res.status(500).send('Internal Server Error');
        }
    });

    app.get('/logout', async (req, res) => {
        try {
            const response = await fetch(`${userMicroserviceURL}/user/logout`, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            res.status(200).send('Logged out successfully');
        } catch (error) {
            console.error('Error logging out user:', error);
            res.status(500).send('Internal Server Error');
        }
    });


    app.delete('/user/:id', async (req, res) => {
        console.log(req.body);
        
        try {
            const response = await fetch(`${userMicroserviceURL}/user/${req.params.id}`, {
                method: 'DELETE',
                body: JSON.stringify(req.body),
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

    app.post('/login', async (req, res) => {
        try {
            const response = await fetch(`${userMicroserviceURL}/user/login`, {
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
            console.error('Error logging in user:', error);
            res.status(500).send('Internal Server Error');
        }
    });
}

module.exports = { initUserRoutes };
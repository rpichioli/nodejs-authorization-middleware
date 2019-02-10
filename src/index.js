const express = require('express');
const bodyParser = require('body-parser');
const middleware_auth = require('./middlewares/auth');
const middleware_cors = require('./middlewares/cors');
const users_router = require('./routes/users');
const port = 9000;

const app = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware
app.use(middleware_cors.allowAll);
// Authentication middleware
app.use(middleware_auth.authenticate);

// Root route
app.get('/', (req, res) => res.send('Welcome to the API server root route!'));
// Users router module applied to '/users/' route
app.use('/users/', users_router);

// Not allowed access setup
app.use((req, res) => res.status(403).json({ error: 'Forbidden access! You are not allowed to access this URL.' }));

app.listen(port, () => console.log(`Server listening to port ${port}`));

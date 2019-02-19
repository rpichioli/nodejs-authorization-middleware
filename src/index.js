const express = require('express');
const bodyParser = require('body-parser');
const middleware_auth = require('./middlewares/auth');
const middleware_cors = require('./middlewares/cors');
const users_router = require('./routes/users');
const port = 9000;

const app = express();

// ------------------------------------------------------------------------
// Middleware
// ------------------------------------------------------------------------
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// CORS middleware - Preseted headers, methods and origins for all requests globally (in this case)
app.use(middleware_cors.allowAll);
// Authentication middleware (applyed globally) - Restricted or not manually by logic, but can be used individually in each call too
app.use(middleware_auth.authenticate);

// ------------------------------------------------------------------------
// Routing
// ------------------------------------------------------------------------
// Root route
app.get('/', (req, res) => res.send('Welcome to the API server root route!'));
// Users router module applied to '/users/' route - Unprotected login and protected data list
app.use('/users/', users_router);
// Not allowed access setup for any accessed unmapped / invalid route
app.use((req, res) => res.status(403).json({ error: 'Forbidden access! You are not allowed to access this URL.' }));

// Starting up server!
app.listen(port, () => console.log(`Server listening to port ${port}`));

const express = require('express');
const bodyParser = require('body-parser');
const middleware_cors = require('./middlewares/cors');
const port = 9000;

const app = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware cross-origin requests
app.use(middleware_cors.allowAll);

app.get('/', (req, res) => res.send('Welcome to the API server root route!'));

// Not allowed access setup
app.use((req, res) => res.status(403).json({ error: 'Forbidden access! You are not allowed to access this URL.' }));

app.listen(port, () => console.log(`Server listening to port ${port}`));

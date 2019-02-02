const express = require('express');

const app = express();

app.get('/', () => res.send('Welcome to the API server root route!'));

app.listen(80, () => console.log('Server listening to port 80'));

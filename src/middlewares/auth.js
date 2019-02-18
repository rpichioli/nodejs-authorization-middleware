const validator = require('validator');
const jwt = require('jsonwebtoken');
const security = require('../config/security');

// Auth middleware that authenticates user based on received token
// 1 - Extract authorization key from received header
// 2 - Split by space and get the hash, first is "Bearer"
// 3 - Check if token is exists
// 4 - Check if token is valid
// 5 - Everything OK, pass.. In otherwise, response end here
module.exports = {
 	authenticate: (req, res, next) => {
		// Retrieve token from header
		const authorizationHeader = req.headers['authorization'];
		// Reserving variable for token
		let token;
		// Get received token
		if (authorizationHeader) token = authorizationHeader.split(' ')[1];

		// Bypass authorization middleware if path is "users/login"
		if (req.path === '/users/login') next();
		// Token exists then validate to provide access or not
		else if (token && !validator.isEmpty(token)) {
			// Validate token with the secret
			jwt.verify(token, security.jwtSecret, (err, decoded) => {
				if (err) {
					res.status(401).json({ error: 'Authentication refused! Unauthorized action.' });
					res.end();
				} else {
					// Suggest - You can check database here if you want to save it

					next(); // Let de request proceed to it's endpoint naturally
				}
			});
		} else {
			res.status(401).json({ error: "Unauthorized! You must be logged in to use this service!" });
			res.end();
		}
	}
}

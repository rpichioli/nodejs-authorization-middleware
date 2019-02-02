const validator = require('validator');
const jwt = require('jsonwebtoken');
const security = require('../config/security');

// Authorization middleware
// 1 - Check if token is passed
// 2 - Check if token is valid
module.exports = {
 	authenticate: (req, res, next) => {
		// Retrieve token from header
		const authorizationHeader = req.headers['authorization'];
		// Reserving variable for token
		let token;
		// Get received token
		if (authorizationHeader) token = authorizationHeader.split(' ')[1];

		// Bypass authorization middleware if logged in or route is 'auth'
		if (req.path === '/api/auth') next(); // || req.session.auth
		// Token exists then validate to provide access or not
		else if (token && !validator.isEmpty(token)) {
			// Validate token with the secret
			jwt.verify(token, security.jwtSecret, (err, decoded) => {
				if (err) {
					res.status(401).json({ error: 'Authentication refused! Unauthorized action.' });
					res.end();
				} else {
					// TODO - Validate token in database
					// Let de request proceed to it's endpoint
					next();
				}
			});
		} else {
			console.log('Unauthorized.');
			res.status(401).json({ error: "Unauthorized! You must be logged in to use this service!" });
			res.end();
		}
	}
}

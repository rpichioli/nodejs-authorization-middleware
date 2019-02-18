const express = require('express');
const jwt = require('jsonwebtoken');
const exceptions = require('../utils/exceptions');
const security = require('../config/security');

const router = express.Router();

/**
 * Login route that receives data and, after a successful validation, generate and return token
 */
router.post('/login', (req, res) => {
	try {
		// Simulating user in database to validate login
		const user = {
			_id: '1',
			username: 'master',
			name: 'My name is test',
			password: 'xyz.987654321'
		};

		// Extract posted data from request body
		let {username, password} = req.body;

		// Validate received data
		if (!username || !password) throw new exceptions.InvalidDataException("Provide all required data to proceed with login!");

		// Fetch database here the way you need to!
		if (username === user.username && password === user.password) {
			// Generate token with user information, for example
			const token = jwt.sign({
				_id: user._id,
				username: user.username,
				name: user.name,
				email: user.email
			}, security.jwtSecret);

			// You can save token here too!

			// Everything is OK
			res.json({ success: true, token });
		}

		// Return invalid data error
		throw new exceptions.InvalidDataException("Login has been failed! Provide the correct information.")

	} catch (e) {
		if (e instanceof exceptions.InvalidDataException) {
			res.status(500).json({ error: e.message });
		} else {
			res.status(500).json({ error: "Something wrong happens! Try again later or contact the administrator." });
		}
	}
});

router.get('/', (req, res) => {
	try {
		res.send('List would be here, access granted!');
	} catch (e) {
		if (e instanceof exceptions.InvalidDataException) {
			res.status(500).json({ error: e.message });
		} else {
			res.status(500).json({ error: "Something wrong happens! Try again later or contact the administrator." });
		}
	}
});

module.exports = router;

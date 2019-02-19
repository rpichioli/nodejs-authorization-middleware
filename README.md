# nodejs-authorization-middleware
Here you'll see how to implement an **authorization middleware** based on token validation and how to implement login **unprotected  API** to provide valid token and **protected API** that needs authorization to proceed with the response, otherwise the response ends in validation.

The focus is not to work with database and interface. I have mocked an user in the login route (``/users/login``) that must be used to login in the application (you can change it). 

With a valid token in hand after the login, you must use it in protected calls (``/users/``) providing the key **authorization** with value **Bearer [token_goes_here]** in your request header. The middleware will validate it and decide if the request can go on or stop at this point, negating any contact.

### Middlewares
**1. CORS** - Provide access to pre-defined origin, methods and headers to requests (I have allowed globally in this test application). Located at:
```
/middleware/cors.js
```

**2. Authorization** - Our authorization middleware properly, located at:
```
/middleware/auth.js
```

### Token
Another important point is that I'm using **jsonwebtoken** to generate and verify token. The generation is based in a secret that I have saved as a module in:
```
/config/security.js
```

### Tests
You can test the authorization middleware providing a false token to protected API or providing wrong information to login, different from the mocked data. I have working API tests built in [Postman](https://www.getpostman.com/) that I have exported and saved under the folder:
```
/postman_tests/nodejs-authorization-middleware.postman_collection.json
```

## Business Rules
### Authentication Middleware
- Validate Bearer token received from request header through **authorization** key;
- Extract token and try to decode it - Using the secret that generates the cryptography at the first time with **jsonwebtoken**;
- Verify if token is granted at database; (suggestion, database is simulated)
- Grants authorization to protected services, or deny it if somethings is going wrong.

### Login (authorization) API
- Validate posted received data from request;
- Verify if user exists and password cryptography is OK;
- Save into database (suggestion, database is simulated);
- Return 200 response exposing token and boolean success with true, or treated error.

### Developed by
Rodrigo Quiñones Pichioli, since Jan/2019

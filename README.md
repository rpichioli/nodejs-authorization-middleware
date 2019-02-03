# nodejs-authorization-middleware
>In development phase

Coming soon!

The objective is to show how make an Authorization Middleware manually providing a security layer to proteced API.

#### Authentication Middleware ####
- Validate Bearer token received from request header through **authorization** key;
- Extract token and try to decode it - Using the secret that generates the cryptography at the first time with **jsonwebtoken**;
- Verify if token is granted at database; (suggestion, database is simulated)
- Grants authorization to protected services, or deny it if somethings is going wrong.

#### Login (authorization) API ####
- Validate posted received data from request;
- Verify if user exists and password cryptography is OK;
- Save into database (suggestion, database is simulated);
- Return 200 response exposing token and boolean success with true, or treated error.

### Developed by
Rodrigo Quiñones Pichioli, since Jan/2019

# nodejs-authorization-middleware
This project shows how to implement middleware within NodeJS + Express server and how to build basic **authorization middleware**.

The objective is to support developers in how to build a complete flow applying auth concepts within NodeJS and apply NodeJS concepts too. 

## Important Notes
Basically we have an unprotected entry-point to validate user and provide token (login) in response, and one protected endpoint working under the middleware that expose content if authorized and authenticated, otherwise the response ends in validation.

The focus is not to work with database and interface - I have **mocked an user simulating some database data in login** route (``/users/login``) that must be used to enter successfully the application. 

With a valid token in hand (logged) you can request protected routes (``/users/``) providing the key **authorization** and value **Bearer [token_goes_here]** in your request header. The middleware **verify the token existence in header**, **extract it**, **validate it's integrity with the secret** used to generate it and **validate user** deciding if the request can go on or stop at this point, negating any contact.

### Middlewares
**1. CORS** - Provide pre-configured access globally to **origin**, **methods** and **headers** for all requests (allowed  in this app). Located at:
```
/middleware/cors.js
```

**2. Authorization** - Our authorization middleware properly, located at:
```
/middleware/auth.js
```

### Token
Another important point is that I'm using **jsonwebtoken** to generate and verify token. The token generation is based in a secret that I have saved as a js module located at:
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
- Grants authorization to protected services, or deny it if something is going wrong;
- **Suggestions for most advanced implementations:** You can verify if token is granted in database, you can expire it if passed some time without access, you can work with 2 tokens - one for access and one for authorization - returning the access for user, and more.. 

### Login (authorization) API
- Validate posted received data from request;
- Verify if user exists and password cryptography is OK;
- Return 200 response exposing token and boolean success with true, or treated error;
- **Suggestions for most advanced implementations:** Save into database, set expiration rules.

### Developed by
Rodrigo Quiñones Pichioli, since Jan/2019

//This middleware checks if the user has a valid JWT token in the request headers. If the token is valid, it allows the request to proceed by attaching the user's ID to the request object. Otherwise, it blocks access and returns an unauthorized response.

const jwt = require('jsonwebtoken');
const UserModel = require('../model/user.model');

const requireAuth = async (req,res,next)=>{
    //varify user is authenticated.
    
    //this authorization will be passed by workoutform while axios api fetch
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error:'Authentication token required'})
    }

   //authorization is like Bearer <token> so we need to remove Bearer using string_split.

    const token = authorization.split(' ')[1]

    try {
        //varifying token and it will return token payload which contain id.
        const {_id} = jwt.verify(token,process.env.SECRET_KEY);

        //storing the userID into req.user.
        req.user=await UserModel.findById({_id}).select('_id');

        //calling the next middleware
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error:'Request is not authorized'});
    }
}

module.exports = requireAuth;








// This code defines a middleware function called requireAuth that ensures a user is authenticated before accessing certain routes in a Node.js application. Here's what it does:

// Extract Authorization Header:

// It checks if the authorization header is present in the incoming HTTP request.
// If missing, it responds with a 401 Unauthorized status and an error message.
// Extract Token:

// If the authorization header exists, it extracts the token from it (assuming the header is in the format: "Bearer <token>").
// Verify the Token:

// It verifies the token using jwt.verify() with a secret key (process.env.SECRET).
// If the token is invalid or expired, it responds with a 401 Unauthorized status.
// Attach User to Request Object:

// If the token is valid, it extracts the user ID (_id) embedded in the token.
// It queries the database to find the user with that _id and attaches the user's information (only the _id) to the req.user object for use in subsequent middleware or route handlers.
// Proceed to Next Middleware:

// If authentication succeeds, it calls next() to proceed to the next middleware or route handler.
// Error Handling:

// If any error occurs during the token verification or user lookup, it logs the error and responds with a 401 Unauthorized status.
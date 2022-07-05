const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');


const protect = asyncHandler( async (req, res , next)=>{


    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
try {
    
//Get token from headers
    token = req.headers.authorization.split(' ')[1];

    //verify token
     // declaring a decoded object
    const decoded = jwt.verify(token , process.env.JWT_SECRET);

    //get user by id not including the password

    req.user =(await User.findById(decoded.id).select('-password'));
    
        next();


} catch (error) {

    console.log(error);
    res.status(401);
    throw new Error('Not Authorized');
    
}

    }
    if(!token){
        res.status(401);
        throw new Error('Not Authorized , No token');
    }




})
module.exports = { protect };
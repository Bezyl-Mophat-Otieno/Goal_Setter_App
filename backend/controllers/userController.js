const jwt = require('jsonwebtoken');
const bcrypt = require ('bcryptjs');
const User = require ('../model/userModel');
const asyncHandler = require ('express-async-handler');


//@desc Register a user
//@route  POST /api/users
//@access public
const registerUser = asyncHandler(async (req,res) => {

const { name , email , password} = req.body;

if(!name || !email || ! password){
res.status(400);
throw new Error(' please include all data fields');

}

// check if user exists

const userExists= await User.findOne({email});

if(userExists){
res.status(400);
throw new Error(' User already exists ');

}

// Encrypt the Password (hashing the password)

const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

// create user 

const user = User.create({
    name:req.body.name,
    email:req.body.email,
    password: hashedPassword
})

//if user was created successfully
if(user){
    res.status(201).json({
        _id:(await user).id,
        name:( await user).name,
        email:( await user).email,
        Token: await generateToken((await user)._id)

        
       
    });



} else{
res.status(400)
throw new Error('User was not registered')

}



})


//@desc Authenticate a user
//@route  POST /api/users/login
//@access public
const loginUser =asyncHandler (async (req,res) => {
    const {email , password}  = req.body

    const user =  await User.findOne({email});

    if(user && (await bcrypt.compare(password , user.password))){
        res.json({
            
            _id:(await user).id,
            name:( await user).name,
            email:( await user).email,
            Token:  generateToken((await user)._id)
    

        });

    }
    else {

        res.status(400)
        throw new Error('invalid credentials');

    }

    
    })

    
    
//@desc get  user data
//@route  POST /api/users/me
//@access private
const getMe =asyncHandler (async (req,res) => {
    res.status(200).json( await req.user);

    });

    // GENERATE JWT
    const generateToken = (id)=>{

        return jwt.sign({id},process.env.JWT_SECRET,{expiresIn : '30d'});
    };
    
    module.exports = {
       registerUser,
             loginUser,
             getMe,
             
        };
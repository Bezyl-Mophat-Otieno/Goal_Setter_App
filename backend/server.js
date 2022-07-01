const dotenv = require('dotenv').config({path:'./backend/.env'}); 
const express=require('express');
const port=process.env.PORT || 5000
const colors=require('colors');
const connectDB=require('./config/db');

connectDB();



const app=express();
const {errorHandler}=require('./middleware/errorhandlermiddleware');
//adding a body parser middleware 
app.use(express.json());
//adding a form handling data middleware

app.use(express.urlencoded({extended:false}));

//adding an error handler

app.use(errorHandler);

app.use('/api/goals',require('./routes/goalRoutes'));
app.use('/api/user',require('./routes/userRoutes'));



app.listen(port,() =>{
    console.log(`Server started on port ${port}`);
}); 
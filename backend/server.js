const express=require('express');
const dotenv=require('dotenv').config();
const PORT=process.env.PORT || 8000;
const app=express();
const {errorHandler}=require('./middleware/errorhandlermiddleware')
//adding a body parser middleware 
app.use(express.json());
//adding a form handling data middleware

app.use(express.urlencoded({extended:false}));

//adding an error handler

app.use(errorHandler);

app.use('/api/goals',require('./routes/goalRoutes'));





app.listen(PORT,() =>{
    console.log(`Server started on port${PORT}`);
}); 
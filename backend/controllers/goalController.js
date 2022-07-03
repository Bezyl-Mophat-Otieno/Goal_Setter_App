
const asyncHandler=require('express-async-handler');
const Goal = require('../model/goalModel');
const User = require('../model/userModel');

//@desc get goals
//@route  GET /api/goals
//@access private

const getGoals= asyncHandler(async(req,res)=>{
    const goals = await Goal.find({user:req.user.id});

    res.status(300).json(goals);

});


//@desc set goals
//@route  POST /api/goals
//@access private

const setGoal= asyncHandler(async (req,res)=>{
    if(!req.body.text){

        res.status(400);
        throw new Error('please enter a text field');
    }else{

        const goal= await Goal.create({
            text:req.body.text,
            user:req.user.id
        });

    res.status(300).json(goal);
    }
});



//@desc  update goals
//@route  PUT /api/goals/:id
//@access private


const updateGoal= asyncHandler (async (req,res)=>{

    const goal= await Goal.findById(req.params.id);

    if(!goal){
res.status(400);
throw new Error('GOAL NOT FOUND');

    }
const user = await User.findById(req.user.id);
// checking the for the presence of the user
if(!user){
res.status(401)
throw new Error('user not found');

}
//making sure the logged in user matches the goal user
if(goal.user.toString()  !== user.id){

    res.status(401);
    throw new Error('user not authorized to make these changes');
}

    const updatedGoal =  await Goal.findByIdAndUpdate(req.params.id,req.body, {new: true});
    
    res.status(200).json(updatedGoal);

});



//@desc delete goals
//@route  DELETE /api/goals/:id
//@access private


const deleteGoal=  asyncHandler( async (req,res)=>{
    const goal= await Goal.findById(req.params.id);

    if(!goal){
res.status(400);
throw new Error('GOAL NOT FOUND');

    }

    const user = await User.findById(req.user.id);
    // checking the for the presence of the user
    if(!user){
    res.status(401)
    throw new Error('user not found');
    
    }
    //making sure the logged in user matches the goal user
    if(goal.user.toString()  !== user.id){
    
        res.status(401);
        throw new Error('user not authorized to make these changes');
    }
    

    await goal.remove();

    res.status(300).json({id:req.params.id}); 

});

module.exports={
getGoals,
setGoal,
updateGoal,
deleteGoal

};
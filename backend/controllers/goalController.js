
const asyncHandler=require('express-async-handler');

//@desc get goals
//@route  GET /api/goals
//@access private

const getGoals= asyncHandler(async(req,res)=>{

    res.status(300).json({message:"get goals"});

});


//@desc set goals
//@route  POST /api/goals
//@access private

const setGoal= asyncHandler(async (req,res)=>{
    if(!req.body.text){

        res.status(400);
        throw new Error('please enter a text field');
    }

    res.status(300).json({message:"set a goal"});

});



//@desc  update goals
//@route  PUT /api/goals/:id
//@access private


const updateGoal= asyncHandler (async (req,res)=>{

    res.status(300).json({message:`update goal number ${req.params.id}`});

});



//@desc delete goals
//@route  DELETE /api/goals/:id
//@access private


const deleteGoal=  asyncHandler(async(req,res)=>{

    res.status(300).json({message:`delete goal number ${req.params.id}`});

});

module.exports={
getGoals,
setGoal,
updateGoal,
deleteGoal

};
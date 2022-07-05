const express=require('express');
const router=express.Router();
const {getGoals,setGoal,updateGoal,deleteGoal}=require('../controllers/goalController');
// calling the protect function that protects the user goals
const {protect}=require('../middleware/authMiddleware');

// router.get('/',getGoals);

// router.post('/', setGoal);
router.route('/').get(  getGoals ).post(protect,setGoal );

// router.put('/:id', updateGoal);

// router.delete('/:id', deleteGoal);
router.route('/:id').put( updateGoal ).delete( deleteGoal  );




module.exports=router;
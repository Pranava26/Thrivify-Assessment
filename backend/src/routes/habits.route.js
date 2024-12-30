import express from 'express';
import {createHabit, getUserHabits, updateHabit, deleteHabit} from '../controllers/habits.controller.js';
import {protectRoute} from '../middleware/auth.middleware.js';

const router = express.Router();

//create habits
router.post('/habits', protectRoute, createHabit);

//get habits for authenticated users
router.get('/habits', protectRoute, getUserHabits);

//update habit
router.put('/habits/:id', protectRoute, updateHabit);

//delete habit
router.delete('/habits/:id', protectRoute, deleteHabit);

export default router
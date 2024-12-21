const express = require('express');
const { createHabit, getUserHabits, updateHabit, deleteHabit } = require('../controllers/habits.controller');
const { protectRoute } = require('../middleware/auth.middleware');

const router = express.Router();

//create habits
router.post('/habits', protectRoute, createHabit);

//get habits for authenticated users
router.get('/habits', protectRoute, getUserHabits);

//update habit
router.put('/habits/:id', protectRoute, updateHabit);

//delete habit
router.delete('/habits/:id', protectRoute, deleteHabit);

module.exports = router;
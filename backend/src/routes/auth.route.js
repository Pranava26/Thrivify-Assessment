const express = require('express');
const { signup, login, logout, updateProfile } = require('../controllers/auth.controller');
const { protectRoute, checkAuth } = require('../middleware/auth.middleware');

const router = express.Router();

//create user route
router.post('/signup', signup);

//login route
router.post('/login', login);

//logout route
router.post('/logout', logout);

//update profile route
router.put('/update-profile', protectRoute, updateProfile)

router.get('/check', protectRoute, checkAuth)

module.exports = router;
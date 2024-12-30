import express from 'express';
import { signup, login, logout, updateProfile } from '../controllers/auth.controller.js';
import { protectRoute, checkAuth } from '../middleware/auth.middleware.js'

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

export default router
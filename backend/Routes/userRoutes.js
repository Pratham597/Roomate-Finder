// USER ROUTES
import express from 'express'
import { login,signUp } from '../Controllers/userController.js';
import wrapAsync from '../Utils/wrapAsync.js';

const router=express.Router();

router.post('/signUp',wrapAsync(signUp));
router.post('/login',wrapAsync(login));

export default router;


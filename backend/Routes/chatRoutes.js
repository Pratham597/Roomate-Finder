import express from 'express'
import auth from '../Utils/authMiddleware.js'
import wrapAsync from '../Utils/wrapAsync.js'
import { fetchChat,createChat } from '../Controllers/chatController.js';

const router=express.Router();

router.use(wrapAsync(auth));
router.route('/').get(wrapAsync(fetchChat)).post(wrapAsync(createChat));

export default router;
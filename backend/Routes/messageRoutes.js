import express from 'express'
import auth from '../Utils/authMiddleware.js'
import wrapAsync from '../Utils/wrapAsync.js';
import { fetchMessage,sendMessage } from '../Controllers/messageController.js';

const router=express.Router();

router.use(wrapAsync(auth));
router.get('/:chatId',wrapAsync(fetchMessage));
router.post('/',wrapAsync(sendMessage));

export default router;
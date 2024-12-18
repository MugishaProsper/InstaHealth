import { signup, login, logout, verifyCode } from '../controllers/auth.controllers.js';
import express from 'express';
import authorize from '../middlewares/auth.middlewares.js';
import multer from 'multer';
import { uploadProfilePicture, getProfilePicture } from '../controllers/files.controllers.js';

const router = express.Router();

const upload = multer({ storage : multer.memoryStorage() });

router.post('/login', login);
router.post('/register', signup);
router.post('/logout', logout);
router.post('/verify', authorize, verifyCode);
router.post('/profile-picture', authorize, upload.single('file'), uploadProfilePicture);
router.get('/profile-picture/profile', authorize, getProfilePicture);


export default router;
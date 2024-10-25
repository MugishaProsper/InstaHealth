import { signup, login, logout } from '../controllers/auth.controllers.js';
import express from 'express';

const router = express.Router();

router.post('/login', login);
router.post('/register', signup);
router.post('/logout', logout)

export default router;
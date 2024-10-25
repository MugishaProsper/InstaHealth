import express from 'express';
import authorize from '../middlewares/auth.middlewares.js';
import { getUsersForSideBar } from '../controllers/user.controllers.js';

const userRoutes = express.Router();

userRoutes.get('/', authorize, getUsersForSideBar);

export default userRoutes;

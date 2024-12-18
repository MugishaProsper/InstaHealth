import express from 'express';
import authorize from '../middlewares/auth.middlewares.js';
import { getUsersForSideBar } from '../controllers/message.controllers.js';
import multer from 'multer';

const userRoutes = express.Router();

// profile updates here

userRoutes.get('/', authorize, getUsersForSideBar);

export default userRoutes;

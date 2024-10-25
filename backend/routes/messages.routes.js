import express from 'express';
import { getMessages, sendMessage } from '../controllers/message.controllers.js';
import authorize from '../middlewares/auth.middlewares.js';

const messageRoutes = express.Router();

messageRoutes.get('/:id', authorize, getMessages);
messageRoutes.post('/send/:id', authorize, sendMessage);

export default messageRoutes;
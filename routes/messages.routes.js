import express from 'express';
import { getConversations, getMessages, getNofications, sendMessage } from '../controllers/message.controllers.js';
import authorize from '../middlewares/auth.middlewares.js';

const messageRoutes = express.Router();

messageRoutes.get('/direct/inbox/:id', authorize, getMessages);
messageRoutes.post('/direct/inbox/:id', authorize, sendMessage);
messageRoutes.get('/direct/notifications', authorize, getNofications);
messageRoutes.get('/direct/inbox', authorize, getConversations);

export default messageRoutes;
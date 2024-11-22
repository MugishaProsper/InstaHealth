import express from 'express';
import authorize from '../middlewares/auth.middlewares.js';
import { fetchAppointmentRequests, requestAppointment } from '../controllers/user.controllers.js';
import { getUsersForSideBar } from '../controllers/message.controllers.js';

const userRoutes = express.Router();

userRoutes.get('/', authorize, getUsersForSideBar);
userRoutes.post('/:id/request/appointment',authorize, requestAppointment);
userRoutes.post('/:id/request/consultation');
userRoutes.get('/appointments/all', authorize, fetchAppointmentRequests)

export default userRoutes;

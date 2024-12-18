import express from 'express';
import authorize from '../middlewares/auth.middlewares.js';
import { getAppointmentRequests, approveAppointmentRequest, rejectAppointmentRequest, requestAppointment } from '../controllers/appointments.controllers.js';

const appointmentRoutes = express.Router();

appointmentRoutes.get('/appointments', authorize, getAppointmentRequests);
appointmentRoutes.post('/appointments/:id/approve', authorize, approveAppointmentRequest);
appointmentRoutes.post('/appointments/:id/reject', rejectAppointmentRequest);
appointmentRoutes.post('/appointments/:id/request', authorize, requestAppointment);

export default appointmentRoutes;
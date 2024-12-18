import express from 'express';
import authorize from '../middlewares/auth.middlewares';
import { getAppointmentRequests, approveAppointmentRequest, rejectAppointmentRequest } from '../controllers/appointments.controllers';

const appointmentRoutes = express.Router();

appointmentRoutes.get('/appointments', authorize, getAppointmentRequests);
appointmentRoutes.post('/appointments/:id/approve', authorize, approveAppointmentRequest);
appointmentRoutes.post('/appointments/:id/reject', rejectAppointmentRequest);
approveAppointmentRequest.post('/appointments/:id/request', authorize, requestAppointment);

export default appointmentRoutes;
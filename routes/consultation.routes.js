import express from 'express';
import authorize from '../middlewares/auth.middlewares.js';
import { requestConsultation, acceptConsultation, rejectConsultation, getConsultationRequests } from '../controllers/consultations.controllers.js';

const consultationRoutes = express.Router();

consultationRoutes.post('/consultations/:id/request', authorize, requestConsultation);
consultationRoutes.post('/consultations/:id/accept', authorize, acceptConsultation);
consultationRoutes.post('/consultations/:id/reject', authorize, rejectConsultation);
consultationRoutes.post('/consultations/:id/cancel', authorize, getConsultationRequests);
consultationRoutes.get('/consultations', authorize, getConsultationRequests);

export default consultationRoutes;
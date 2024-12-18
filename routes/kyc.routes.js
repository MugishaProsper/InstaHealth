import express from 'express';
import authorize from '../middlewares/auth.middlewares.js';
import multer from 'multer';
import { uploadMedicalCertificate, uploadMedicalLicense, getMedicalCertificate } from '../controllers/files.controllers.js';

// define upload

const upload = multer({ storage : multer.memoryStorage() });

const kycRoutes = express.Router();

kycRoutes.get('/certificate/all', authorize, getMedicalCertificate);
kycRoutes.post('/certificate/upload', authorize, upload.single('file'), uploadMedicalCertificate);
kycRoutes.post('/license/upload', authorize, upload.single('file'), uploadMedicalLicense);

export default kycRoutes;
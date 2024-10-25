import multer from 'multer';
import { signup, login, logout } from '../controllers/auth.controllers.js';
import Certificate from '../models/user.models.js'
import User from '../models/user.models.js'
import express from 'express';

const router = express.Router();

const upload = multer({ storage : multer.memoryStorage() })

router.post('/login', login);
router.post('/register', signup);
router.post('/logout', logout)
router.post('certificate/upload', upload.single('file'), async (req, res) => {
    const { userId } = req.params;
    try{
        const user = await User.findOne({ userId });
        if(!user){
            res.status(404).json({ message : 'User not found' });
        }
        const newCertificate = new Certificate({
            name : req.file.originalname,
            file : req.file.buffer,
            contentType : req.file.mimetype
        });

        await newCertificate.save();
        user.medicalCertificate = newCertificate;
        res.status(200).json({ message : 'File uploaded successfully' });

    }catch(error){
        console.error(error.message);
        res.status(500).json({ message : 'Server error' });
    }
})

export default router;
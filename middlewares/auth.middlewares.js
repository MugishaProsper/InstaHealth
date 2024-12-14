import jwt from 'jsonwebtoken';
import { User } from '../models/user.models.js';

import { configDotenv } from 'dotenv';

configDotenv();

const authorize = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.jwt_secret); // Ensure correct environment variable
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user = await User.findOne({ _id : decoded.id }).select("-password");
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error in middleware:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export default authorize;

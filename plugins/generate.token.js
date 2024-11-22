import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ id : userId }, process.env.jwt_secret, { expiresIn : '15d' });

  res.cookie("jwt", token, {
    maxAge : 15*24*60*60*1000,
    httpOnly : true, // Avoid XSS attacks
    sameSite : "strict", // Avoid XSRF attacks
    secure : process.env.node_env !== "development"
  });
}
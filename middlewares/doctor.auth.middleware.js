import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.models.js";

const authorizeDoctor = async (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    if(!token){
      return res.status(201).json({ message : "No token provided"});
    };
    const decoded = jwt.verify(token, process.env.jwt_secret);
    if(!decoded){
      return res.status(201).json({ message : "Invalid token"});
    };

    const user = await User.findOne({ _id : decoded.id }).select("-password");
    if(!user){
      return res.status(201).json({ message : "User not found"});
    };
    if(user.role !== "doctor"){
      return res.status(403).json({ message : "Unauthorized" });
    }
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : "Server error" });
  }
};

export default authorizeDoctor;
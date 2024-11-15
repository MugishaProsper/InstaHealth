import { User } from '../models/user.models.js';
import bcrypt from 'bcryptjs'
import { generateTokenAndSetCookie } from '../plugins/generate.token.js';
import { generateVerificationCode } from '../plugins/verification.code.js';
import { sendVerificationCode } from '../config/email.config.js';
import { notify } from './message.controllers.js';

export const signup = async (req, res) => {
  const { firstName, lastName, username, email, role, gender, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if(user){
      return res.status(409).json({ message : `User with ${email} already exists` });
    };
    const profilePic = `https://avatar.iran.liara.run/public/job/doctor/${gender.toLowerCase()}`;
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationCode = await generateVerificationCode(); // Generate verification code
    const new_user = new User({ firstName, lastName, username, email, password : hashedPassword, profilePicture : profilePic, role : role, verificationCode : verificationCode });
    await new_user.save();
    await sendVerificationCode(new_user.email, verificationCode);
    generateTokenAndSetCookie(new_user._id, res);
    return res.status(200).json({ message : `${role} created successfully`, new_user })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message : 'Server error' })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'No user with such email' });
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    generateTokenAndSetCookie(user._id, res);
    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  try{
      res.cookie("jwt", "", { maxAge : 0 });
      res.status(200).json({ message : 'Logged out successfully' })
  }catch(error){
    console.error('Error logging out : ', error.message);
    res.status(500).json({ message : 'Server error' });
  }
};

export const verifyCode = async (req, res) => {
  const userId = req.user._id;
  const { verification_code } = req.body;
  try {
    const user = await User.findById(userId);
    if(user.verificationCode != verification_code){
      return res.status(401).json({ message : "Incorrect verification code"});
    }
    user.isVerified = true;
    await user.save();
    const message = `Your email ${user.email} has been verified successfully`;
    await notify(user._id, message);
    return res.status(200).json({ message : "Email Verified successfully" });
  } catch (error) {
    console.log("Error verifying email : ", error.message);
    return res.status(500).json({ message : "Server error" });
  }
};

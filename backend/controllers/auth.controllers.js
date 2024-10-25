import User from '../models/user.models.js';
import bcrypt from 'bcryptjs'
import { generateTokenAndSetCookie } from '../plugins/generate.token.js';

export const signup = async (req, res) => {
  const { firstName, lastName, username, email, role, gender, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if(user){
      return res.status(401).json({ message : `User with ${email} already exists` });
    };
    const profilePic = `https://avatar.iran.liara.run/public/job/doctor/${gender.toLowerCase()}`;
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt)
    const new_user = await User({ firstName, lastName, username, email, password : hashedPassword, profilePicture : profilePic, role : role })
    if(new_user){
      generateTokenAndSetCookie(new_user._id, res)
      await new_user.save();
      return res.status(200).json({ message : `${role} created successfully`, new_user })
    }else{
      res.status(400).json({ message : 'Invalid user data'})
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message : 'Server error' })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if(!user){
      res.status(404).json({ message : 'No user with such email' });
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if(!isPasswordMatching){
      res.status(404).json({ message : 'Incorrect password' });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({ message : 'Login successfull', user });
  } catch (error) {
    console.error(error.message);
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
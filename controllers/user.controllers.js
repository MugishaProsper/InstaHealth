import multer from "multer";
import { User } from "../models/user.models.js";

const upload = multer({ storage: multer.memoryStorage() })

/* Functions for the user profile functionalities */

export const updateProfile = async (req, res) => {
  const userId = req.user._id;
  const { firstName, lastName, username } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    };
    user.firstName = firstName ? firstName : user.firstName;
    user.lastName = lastName ? lastName : user.lastName;
    user.username = username ? username : user.username;

    if (req.file) {
      user.profilePicture = req.file.buffer;
      user.profilePictureContentType = req.file.mimetype;
    }

    await user.save();
    return res.status(200).json({ message: `${user.username} updated successfully` });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" })
  }
}

export const getProfilePicture = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId).select('profilePicture profilePictureContentType');

    if (!user || !user.profilePicture) {
      return res.status(404).json({ message: "No profile pciture found" })
    }
    res.set('ContentType', user.profilePictureContentType);
    return res.status(200).send(user.profilePicture)
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

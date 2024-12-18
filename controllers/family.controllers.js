import { Family } from "../models/family.models.js";
import { User } from "../models/user.models.js";

export const createFamily = async (req, res) => {
  const userId = req.user._id;
  const { head, members } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    };

    const newFamily = new Family({ head : head ? head : user._id, members });
    await newFamily.save();
    return res.status(200).json({ message : "Family created successfully", family : newFamily });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : "Server error" });
  }
}


import User from '../models/user.models.js';

export const getUsersForSideBar = async (req, res) => {
  try {

    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id : { $ne : loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
    
  } catch (error) {
    console.error("Error fetching users");
    res.status(500).json({ message : "Server error" });
  }
}

export const requestAppointment = async (doctorId, req, res) => {
  const { description } = req.body;
  const userId = req.user.id;
  try {
    const doctor = await User.findOne({ doctorId });
    const user = await User.findOne({ userId });
    if(!doctor){
      res.status(404).json({ message : 'Such doctor not found '});
    };



  } catch (error) {
    
  }
};

export const getProfilePercentage = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ userId });
    if(!user){
      res.status(404).json({ messsage : 'No user found' });
    }
    // extraction of percentage of completion functionality

    
  } catch (error) {
    
  }
}
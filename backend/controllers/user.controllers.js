import { User, AppointmentRequest, Appointment } from '../models/user.models.js';


export const getUsersForSideBar = async (req, res) => {

  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id : { $ne : loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
    
  } catch (error) {
    console.error("Error fetching users : ", error);
    res.status(500).json({ message : "Server error" });
  }
};

// User request appointment
export const requestAppointment = async (req, res) => {
  const userId = req.user._id;
  const { doctor_id, description } = req.body;

  if(!doctor_id || !description){
    return res.status(400).json({ message : "please fill all fields" })
  }

  try{
    const doctor = await User.findById(doctor_id);
    if(!doctor){
      res.status(404).json({ message : "No doctor found" });
    }

    const newAppointmentRequest = new AppointmentRequest({
      appointmentId : new mongoose.Types.ObjectId(),
      patientId : userId,
      doctorId : doctor_id,
      description : description
    });

    await newAppointmentRequest.save();

    res.status(200).json({ message : "Appointment requested" });
    
  } catch (error) {

    console.log("Error requesting appointment : ", error);
    res.status(500).json({ message : "Server error" });

  }
};

// Doctor fetching all appointment

export const fetchAppointments = async (req, res) => {
  const userId = req.user._id;
  try{
    const appointments = await Appointment.findById({ $or : [ { patientId : userId }, { doctorId : userId }] });
    if(!appointments || appointments.length == 0){
      return res.status(404).json({ message : "No Appointments found" })
    }
    return res.status(200).json(appointments);
  }catch(error){
    console.log("Error fetching appointments : ", error);
    res.status(500).json({ message : "Server error" });
  }
}

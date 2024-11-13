import { User, Appointment, Consultation } from '../models/user.models.js';


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

export const requestAppointment = async (req, res) => {
  const userId = req.user._id;
  const { doctorId } = req.params;
  const { description } = req.body;

  try{
    const doctor = await User.findById({ doctorId });
    if(!doctor){
      return res.status(404).json({ message : "Doctor not found" });
    };
    const newAppointment = new Appointment({
      patientId : userId,
      doctorId : doctorId,
      description : description
    });
    await newAppointment.save();
    res.status(200).json({ message : "Appointment requested" });
  } catch (error) {
    console.log("Error requesting appointment : ", error);
    res.status(500).json({ message : "Server error" });
  }
};

export const fetchAppointmentRequests = async (req, res) => {
  const userId = req.user._id;
  try{
    const appointments = await Appointment.find({ doctorId : userId, isAccepted : false });
    if(!appointments || appointments.length == 0){
      return res.status(404).json({ message : "No Appointments found" })
    }
    return res.status(200).json(appointments);
  }catch(error){
    console.log("Error fetching appointments : ", error);
    res.status(500).json({ message : "Server error" });
  }
};

export const approveAppointmentRequest = async (req, res) => {
  const userId = req.user._id;
  const { appointmentId } = req.params;
  const { appointment_date, short_note } = req.body;
  try {
    const appointment = await Appointment.findOne({ doctorId : userId, _id : appointmentId });
    if(!appointment){
      return res.status(404).json({ message : "Appointment request not found" });
    };
    appointment.isAccepted = true;
    appointment.appointmentDate = appointment_date;
    appointment.shortNotes = short_note;
    await appointment.save();
    return res.status(200).json({ message : "Appointment approved successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message : "Server error" });
  }
};

export const requestConsultation = async (req, res) => {
  const userId = req.user._id;
  const { doctorId } = req.params;
  try {
    const doctor = await User.findById(doctorId);
    if(!doctor){
      return res.status(404).json({ message : "Doctor not found" });
    };
    const new_consultation = new Consultation({ doctorId : doctorId, patientId : userId });
    await new_consultation.save();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message : "Server error" })
  }
};

export const acceptConsultation = async (req, res) => {
  const { consultationId } = req.params;
  const { rendez_vous } = req.body;
  try {
    const consultation = await Consultation.findById(consultationId);
    if(!consultation){
      return res.status(404).json({ message : "Consultation not found" });
    }
    consultation.isAccepted = true;
    consultation.rendez_vous = rendez_vous;
    await consultation.save();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message : "Server error" });
  }
}
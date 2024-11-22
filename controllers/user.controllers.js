import multer from "multer";
import { Appointment, Consultation, User } from "../models/user.models.js";
import { notify } from "./message.controllers.js";

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


/* Functions for functionalising the user */

export const requestAppointment = async (req, res) => {
  const userId = req.user._id;
  const { doctorId } = req.params;
  const { description } = req.body;
  try {
    const doctor = await User.findById(doctorId); // Corrected findById usage
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const patient = await User.findById(userId); // Extract patient if he/she exists
    if (!patient) {
      return res.status(401).json({ message: "No such patient found" });
    }

    // Create new appointment
    const newAppointment = new Appointment({ patientId: userId, doctorId, description });
    await newAppointment.save(); // Save new appointment

    // Define message to be sent to doctor
    const message = `${patient.firstName} ${patient.lastName} has requested an appointment with you`;
    await notify(doctor._id, message); // Handle potential errors here

    // Return success message
    res.status(200).json({ message: `Appointment requested to ${doctor.firstName} ${doctor.lastName}` });
  } catch (error) {
    console.log("Error requesting appointment: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const approveAppointmentRequest = async (req, res) => {
  const userId = req.user._id;
  const { appointmentId } = req.params;
  const { appointment_date, short_note } = req.body;
  try {
    const appointment = await Appointment.findOne({ doctorId: userId, _id: appointmentId });
    if (!appointment) {
      return res.status(404).json({ message: "Appointment request not found" });
    }

    const doctor = await User.findById(userId); // Fetch doctor details
    appointment.isAccepted = true;
    appointment.appointmentDate = appointment_date;
    appointment.shortNotes = short_note;
    await appointment.save();

    // Make notification to send to patient
    const message = `Dr. ${doctor.firstName} ${doctor.lastName} has accepted your appointment request scheduled at ${appointment.appointmentDate}`;
    await notify(appointment.patientId, message);

    return res.status(200).json({ message: "Appointment approved successfully", appointment });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const fetchAppointmentRequests = async (req, res) => {
  const userId = req.user._id;
  try {
    const appointments = await Appointment.find({ doctorId: userId }).sort({ isAccepted: false });
    if (appointments.length === 0) {
      res.status(404).json({ message: "Server error" });
    }
    return res.status(200).json(appointments);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

export const requestConsultation = async (req, res) => {
  const userId = req.user._id;
  const { doctorId } = req.params;
  try {
    const doctor = await User.findById(doctorId);
    const patient = await User.findById(userId);
    if (!doctor || !patient) {
      return res.status(404).json({ message: "Doctor or Patient not found" });
    }
    const new_consultation = new Consultation({ doctorId, patientId: userId });
    await new_consultation.save();

    const message = `${patient.firstName} ${patient.lastName} has requested a consultation with you.`;
    return res.status(200).json({ message: "Consultation requested successfully" }); // Added response
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const acceptConsultation = async (req, res) => {
  const userId = req.user._id;
  const { consultationId } = req.params;
  const { rendez_vous } = req.body;

  if (!rendez_vous) {
    return res.status(400).json({ message: "Rendez-vous time is required." });
  }

  try {
    const consultation = await Consultation.findById(consultationId);
    const doctor = await User.findById(userId);
    if (!consultation || !doctor) {
      return res.status(404).json({ message: "Consultation or doctor not found" });
    }

    consultation.isAccepted = true;
    consultation.rendez_vous = rendez_vous;
    await consultation.save();

    const message = `Dr. ${doctor.firstName} ${doctor.lastName} has accepted your consultation request scheduled at ${consultation.rendez_vous}`;
    await notify(consultation.patientId, message);

    return res.status(200).json({ message: "Consultation accepted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

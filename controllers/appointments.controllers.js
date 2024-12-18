import User from '../models/user.models.js';
import Appointment from '../models/services.models.js';
import { notify } from './message.controllers.js';


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

export const rejectAppointmentRequest = async (req, res) => {
  const userId = req.user._id;
  const { appointmentId } = req.params;
  try {
    const appointment = await Appointment.findOne({ doctorId: userId, _id: appointmentId });
    if (!appointment) {
      return res.status(404).json({ message: "Appointment request not found" });
    }
    await appointment.remove();
    return res.status(200).json({ message: "Appointment request rejected successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

export const getAppointmentRequests = async (req, res) => {
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
};


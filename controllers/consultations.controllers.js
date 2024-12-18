import { User } from "../models/user.models.js";
import { notify } from "./message.controllers.js";
import { Consultation } from "../models/services.models.js";

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
    notify(doctor._id, message)
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

export const rejectConsultation = async (req, res) => {
  const userId = req.user._id;
  const { consultationId } = req.params;
  try {
    const consultation = await Consultation.findById(consultationId);
    const doctor = await User.findById(userId);
    if (!consultation || !doctor) {
      return res.status(404).json({ message: "Consultation or doctor not found" });
    }
    await consultation.remove();
    return res.status(200).json({ message: "Consultation rejected successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getConsultationRequests = async (req, res) => {
  const userId = req.user._id;
  try {
    const consultations = await Consultation.find({ patientId: userId });
    if (consultations.length === 0) {
      return res.status(200).json({ message: "No consultations found" });
    }
    return res.status(200).json(consultations);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}
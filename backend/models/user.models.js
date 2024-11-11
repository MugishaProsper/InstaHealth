import mongoose from "mongoose";

// Define Appointment Request Schema before User Schema
const appointmentRequestSchema = mongoose.Schema({
  appointmentId: { type: String, required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  isAccepted: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

const appointmentSchema = mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'appointmentRequest' },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: mongoose.Schema.Types.ObjectId, ref: 'appointmentRequest' },
  date: { type: Date, required: true }
});

const userSchema = mongoose.Schema({
  firstName : { type: String, required: true },
  lastName : { type: String, required: true },
  username : { type: String },
  email : { type: String, required: true },
  password : { type: String, required: true },
  role : { type: String, enum: ['doctor', 'patient'], default: 'patient' },
  appointmentRequests : { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'appointmentRequest' }], default: undefined },
  appointments : { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }], default : undefined },
  isVerified : { type: Boolean, default: false }, // Changed to Boolean
  medicalCertificate : { type: String },
  medicalLicense: { type: String },
  googleId: { type: String },
  profilePicture : { type: String },
  gender : { type: String, enum: ['male', 'female'], default: 'male' },
  verificationToken : { type : String, default : null }
}, { timestamps: true });

const medicalCertificateSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  file: { type: Buffer, required: true },
  contentType: { type: String }
}, { timestamps: true });

const medicalLicenceSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  file: { type: Buffer, required: true },
  contentType: { type: String }
}, { timestamps: true });

// Export models
export const License = mongoose.model('License', medicalLicenceSchema);
export const Certificate = mongoose.model('Certificate', medicalCertificateSchema);
export const Appointment = mongoose.model('Appointment', appointmentSchema);
export const AppointmentRequest = mongoose.model('appointmentRequest', appointmentRequestSchema); // Updated naming for consistency
export const User = mongoose.model('User', userSchema);

export default { User, Appointment, AppointmentRequest, License };

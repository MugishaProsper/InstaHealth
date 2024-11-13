import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required : true },
  isAccepted : { type : Boolean, default : false },
  shortNotes : { type : String },
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

const consultationSchema = mongoose.Schema({
  doctorId : { type : mongoose.Types.ObjectId, ref : 'User' },
  patientId : { type : mongoose.Types.ObjectId, ref : 'User' },
  rendez_vous : { type : Date, default : Date.now },
  isAccepted : { type : Boolean, default : false }
});

// Export models
export const License = mongoose.model('License', medicalLicenceSchema);
export const Certificate = mongoose.model('Certificate', medicalCertificateSchema);
export const Appointment = mongoose.model('Appointment', appointmentSchema);
export const User = mongoose.model('User', userSchema);
export const Consultation = mongoose.model('Consultations', consultationSchema);

export default { User, Appointment, License, Consultation };

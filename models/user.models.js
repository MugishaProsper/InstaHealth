import mongoose from "mongoose";

const specialitySchema = mongoose.Schema({
  person : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
  speciality : { type : String, required : true }
})

const appointmentSchema = mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required : true },
  isAccepted : { type : Boolean, default : false },
  date: { type: Date, default : Date.now }
});

const roleSchema = mongoose.Schema({
  person : { type : mongoose.Schema.Types.ObjectId, required : true },
  type : { type : String, enum : ['doctor', 'patient'], default : 'patient' },
}, { timestamps : true });

const userSchema = mongoose.Schema({
  firstName : { type: String, required: true },
  lastName : { type: String, required: true },
  username : { type: String },
  email : { type: String, required: true },
  password : { type: String, required: true },
  isVerified : { type: Boolean, default: false }, // Changed to Boolean
  provider : {type : String, enum : ['google', 'facebook']},
  providerId: { type: String },
  defaultProfilePicture : { type : String, required : true },
  profilePicture : { type: Buffer },
  profilePictureContentType : { type : String },
  gender : { type: String, enum: ['male', 'female'], default: 'male' },
  verificationCode : { type : String, default : null }
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
export const Speciality = mongoose.model('Specialities', specialitySchema)
export const License = mongoose.model('License', medicalLicenceSchema);
export const Certificate = mongoose.model('Certificate', medicalCertificateSchema);
export const Appointment = mongoose.model('Appointment', appointmentSchema);
export const User = mongoose.model('User', userSchema);
export const Consultation = mongoose.model('Consultations', consultationSchema);
export const Role = mongoose.model('Roles', roleSchema)

export default { User, Appointment, License, Consultation, Role, Speciality };

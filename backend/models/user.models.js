import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName : { type : String, required : true },
  lastName : { type : String, required : true },
  username : { type : String },
  email : { type : String, required : true },
  password : { type : String, required : true },
  role : { type : String, enum : ['doctor', 'patient'], default : 'patient' },
  isVerified : { type : String },
  medicalCertificate : { type : String },
  medicalLicense : { type : String },
  googleId : { type : String },
  profilePicture : { type : String },
  gender : { type : String, enum : ['male', 'female'], default : 'male' }
}, { timestamps : true });

const appointmentRequestSchema = mongoose.Schema({
  appointmentId : { type : String, required : true },
  patientId : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true },
  doctorId : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true },
  description : { type : String, required : true },
  isAccepted : { type : Boolean, default : false },
  date : { type : Date, default : Date.now }
}, { timestamps : true });

const appointmentSchema = mongoose.Schema({
  appointmentId : { type : mongoose.Schema.Types.ObjectId, ref : 'appointmentRequest' },
  doctorId : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true },
  patientId : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true },
  description : { type : mongoose.Schema.Types.ObjectId, ref : 'appointmentRequest'},
  date : { type : Date, required : true }
})

const medicalCertificateSchema = mongoose.Schema({
  id : { type : mongoose.Schema.Types.ObjectId, ref : "User", required : true },
  name : { type : String, required : true },
  file : { type : Buffer, required : true },
  contentType : { type : String }
}, { timestamps : true });

const medicalLicenceSchema = mongoose.Schema({
  id : { type : mongoose.Schema.Types.ObjectId, ref : "User", required : true },
  name : { type : String, required : true },
  file : { type : Buffer, required : true },
  contentType : { type : String }
}, { timestamps : true })

const License = mongoose.model('License', medicalLicenceSchema) 
const Certificate = mongoose.model('Certificate', medicalCertificateSchema)
const Appointment = mongoose.model('Appointment', appointmentSchema)
const appointmentRequest = mongoose.model('appointment request', appointmentRequestSchema)
const User = mongoose.model('User', userSchema);

export default { User, appointmentRequest, Appointment, Certificate, License };
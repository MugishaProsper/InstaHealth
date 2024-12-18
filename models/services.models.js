import mongoose from 'mongoose';

const appointmentSchema = mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required : true },
  isAccepted : { type : String,enum : ['true', 'false', 'pending'], default : 'pending' },
  date: { type: Date, default : Date.now }
});

const consultationSchema = mongoose.Schema({
  doctorId : { type : mongoose.Types.ObjectId, ref : 'User' },
  patientId : { type : mongoose.Types.ObjectId, ref : 'User' },
  description : { type : String, required : true },
  suggested_time : { type : Date, required : true },
  rendez_vous : { type : Date },
  isAccepted : { type : String, enum : ['true', 'false', 'pending'], default : 'pending' }
});

export const Appointment = mongoose.model('Appointment', appointmentSchema);
export const Consultation = mongoose.model('Consultation', consultationSchema);

export default { Appointment, Consultation }
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  defaultProfilePicture: { type: String },
  profilePicture: { type: Buffer },
  profilePictureContentType: { type: String },
  gender: { type: String, enum: ['male', 'female'], default: 'male' },
  verificationCode: { type: String, default: null }
}, { timestamps: true });

const specialitySchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  field: { type: String, required: true }
});

const roleSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  role: { type: String, enum: ['doctor', 'patient'], default: 'patient' },
}, { timestamps: true });

// Export models
export const Speciality = mongoose.model('Specialities', specialitySchema);
export const User = mongoose.model('User', userSchema);
export const Role = mongoose.model('Roles', roleSchema)

export default { User, Role, Speciality };

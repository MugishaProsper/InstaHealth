import mongoose from "mongoose";

const profilePictureSchema = mongoose.Schema({
  user : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  file: { type: Buffer, required: true },
  contentType: { type: String }
})
const medicalCertificateSchema = mongoose.Schema({
  user : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  file: { type: Buffer, required: true },
  contentType: { type: String }
}, { timestamps: true });

const medicalLicenceSchema = mongoose.Schema({
  user : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  file: { type: Buffer, required: true },
  contentType: { type: String }
}, { timestamps: true });

const passportPhotoSchema = mongoose.Schema({
  user : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true },
  photo : { type : Buffer },
  contentType : { type : String },
}, { timestamps : true });


export const ProfilePicture = mongoose.model("ProfilePicture", profilePictureSchema);
export const MedicalCertificate = mongoose.model("MedicalCertificate", medicalCertificateSchema);
export const MedicalLicence = mongoose.model("MedicalLicence", medicalLicenceSchema);
export const PassportPhoto = mongoose.model("PassportPhoto", passportPhotoSchema);

export default { ProfilePicture ,MedicalCertificate, MedicalLicence, PassportPhoto }

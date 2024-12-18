import { User } from "../models/user.models.js";
import { MedicalCertificate, MedicalLicence } from "../models/documents.models.js";
import { ProfilePicture } from "../models/documents.models.js";

export const uploadProfilePicture = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({ message : "User not found" });
    };
    const newProfilePicture = new ProfilePicture({ user : user._id, name : `${user.firstName}_${user.lastName}_ProfilePicture`, file : req.file.buffer, contentType : req.file.mimetype });

    await newProfilePicture.save();
    return res.status(200).json({ message : "profile picture added successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message : "Server error" });
  }
}

export const getProfilePicture = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({ message : "User not found" });
    }
    const profilePicture = await ProfilePicture.findOne({ user : user._id });
    if(!profilePicture){
      return res.status(404).json({ message : "Profile picture not found" });
    }
    res.set('Content-Type', profilePicture.contentType);
    return res.send(profilePicture.file);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : "Server error" });
  }
}

export const uploadMedicalCertificate = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({ message : "User not found" });
    }
    const newCertificate = new MedicalCertificate({ user : user._id, name : `${user.firstName}_${user.lastName}_Certificate`, file : req.file.buffer, contentType : req.file.mimetype });

    await newCertificate.save();
    return res.status(200).json({ message : "Certificate uploaded successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message : "Server error" });
  }
};

export const uploadMedicalLicense = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({ message : "User not found" });
    }
    const newLicense = new MedicalLicence({ user : user._id, name : `${user.firstName}_${user.lastName}_License`, file : req.file.buffer, contentType : req.file.mimetype });

    await newLicense.save();
    return res.status(200).json({ message : "license uploaded successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : "Server error" });
  }
};

export const getMedicalCertificate = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({ message : "User not found" });
    }
    const certificate = await MedicalCertificate.findOne({ user : user._id });
    if(!certificate){
      return res.status(404).json({ message : "Certificate not found" });
    }
    res.set('Content-Type', certificate.contentType);
    return res.send(certificate.file);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : "Server error" });
  }
};

export const getMedicalLicense = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({ message : "User not found" });
    }
    const license = await MedicalLicence.findOne({ user : user._id });
    if(!license){
      return res.status(404).json({ message : "License not found" });
    }
    res.set('Content-Type', license.contentType);
    return res.send(license.file);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : "Server error" });
  }
}
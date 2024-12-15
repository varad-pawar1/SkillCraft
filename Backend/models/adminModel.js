import { Schema, model } from "mongoose";

const adminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  organization: { type: String },
  gender: { type: String },
  designation: { type: String },
  refreshToken: { type: String },
  resetPassExpires: { type: String },
  Aadhar_Card_Number: { type: String }
});

const adminData = model("admin", adminSchema);





const instructorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  designation: { type: String },
  address: { type: String },
  phone: { type: String },
  gender: { type: String },
  subject: { type: String },
  refreshToken: { type: String },
  resetPassExpires: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: "admin", required: true },
});

const instructorData = model("instructor", instructorSchema);


const studentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  studentCode: { type: String },
  address: { type: String },
  course: { type: String },
  phone: { type: String },
  gender: { type: String },
  refreshToken: { type: String },
  resetPassExpires: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: "admin", required: true }
});

const studentData = model("student", studentSchema);

export { adminData, instructorData, studentData };
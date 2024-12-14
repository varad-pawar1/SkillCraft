import { Schema, model } from "mongoose";

const users = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
  resetPassExpires: { type: String },
});

const usersData = model("users", users);

export { usersData };

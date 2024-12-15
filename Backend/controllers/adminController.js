import argon2 from "argon2";
import { adminData } from "../models/adminModel.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

const signUp = async (req, res) => {
  try {
    const { name, email, password, address, phone, organization, gender, designation, Aadhar_Card_Number } = req.body;

    // Hash the password
    const hashedPass = await argon2.hash(password);

    // Create a new admin user with all fields
    const user = new adminData({ name, email, password: hashedPass, address, phone, organization, gender, designation, Aadhar_Card_Number });

    await user.save();
    res.status(200).json({
      user: { name: user.name, email: user.email, address: user.address, phone: user.phone, organization: user.organization, gender: user.gender },
      msg: "Signup Successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await adminData.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "Invalid password / user not found" });
    }

    const correctPass = await argon2.verify(user.password, password);

    if (correctPass) {
      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
        },
        process.env.JWT_LOGIN
      );
      res.status(200).json({ token: token });
    } else {
      res.status(404).json({ msg: "Invalid password / user not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


const forgetpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await adminData.findOne({ email });
    const refreshToken = crypto.randomBytes(32).toString("hex");
    const tokenhash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");
    user.refreshToken = tokenhash;
    user.resetPassExpires = Date.now() + 3600000;
    await user.save();
    const transporter = nodemailer.createTransport({
      service: "GMAIL",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });
    const mailOptions = {
      to: email,
      subject: "RESET Password Link",
      html: `
            <p>CLICK on the link below to reset your password</p>
            <a href = "http://localhost:2022/users/resetpassword?token=${refreshToken}">RESET password</a>
          `,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ msg: "Mail sent successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};


const resetpassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    console.log(newPassword, "this is a new pass");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await adminData.findOne({
      refreshToken: hashedToken,
      resetPassExpires: { $gt: Date.now() },
    });
    user.password = await argon2.hash(newPassword);
    console.log(user.password);
    user.refreshToken = undefined;
    user.resetPassExpires = undefined;
    await user.save();
    res.status(200).json({ msg: "Password reset successfull" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export { signUp, login, forgetpassword, resetpassword };

import { usersData } from "../models/userModel.js";
import crypto from "crypto";
import argon2 from "argon2";
import nodemailer from "nodemailer";
import "dotenv/config";

const forgetpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await usersData.findOne({ email });
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

//http://localhost:2022/users/resetpassword?token=192b81215e654f176d2cce5809b8a5a1b0347803a417c759a07e0caf01ea3425
// http://localhost:2022/users/resetpassword?token=e5aabe23a759b5ec5d9a3138795ff81a59e15932319af3592f36ebb1d8c93ed4
const resetpassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    console.log(newPassword, "this is a new pass");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await usersData.findOne({
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

export { forgetpassword, resetpassword };

import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { studentData } from "../models/adminModel.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import "dotenv/config"
const signUp = async (req, res) => {
    try {
        const { name, email, password, address, phone, gender, course, studentCode } = req.body;

        // Check if the email is already taken
        const existingStudent = await studentData.findOne({ email });
        if (existingStudent) {
            return res.status(409).json({ msg: "Email already in use" });
        }

        // Hash the password
        const hashedPass = await argon2.hash(password);

        // Create a new student
        const student = new studentData({
            name,
            email,
            password: hashedPass,
            address,
            phone,
            gender,
            course,
            studentCode,
            createdBy: res.locals.adminId, // Admin ID from middleware
        });

        await student.save();

        res.status(201).json({
            msg: "Student registered successfully",
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
            },
        });
    } catch (error) {
        console.error("Error during signup:", error.message);
        res.status(500).json({ error: error.message });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)
        const user = await studentData.findOne({email});
        console.log(user)
        if (!user) {
            return res.status(404).json({ msg: "Invalid credentials" });
        }

        const correctPass = await argon2.verify(user.password, password);

        if (correctPass) {
            const token = jwt.sign(
                {
                    id: user._id,
                    name: user.name,
                },
                process.env.JWT_LOGIN,
                { expiresIn: "1d" }
            );

            res.status(200).json({ token });
        } else {
            res.status(404).json({ msg: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ error: error.message });
    }
};


const forgetpassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await studentData.findOne({ email });
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
              <a href = "http://localhost:2022/student/resetpassword?token=${refreshToken}">RESET password</a>
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
        console.log(newPassword, "This is a new pass");
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await studentData.findOne({
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

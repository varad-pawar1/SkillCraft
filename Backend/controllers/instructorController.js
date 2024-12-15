import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { instructorData } from "../models/adminModel.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import "dotenv/config";
import { creationData } from "../models/instructorModel.js";

const signUp = async (req, res) => {
    try {
        const { name, email, password, designation, address, phone, gender, subject } = req.body;

        // Hash the password
        const hashedPass = await argon2.hash(password);

        // Create a new instructor with admin ID
        const instructor = new instructorData({
            name,
            email,
            password: hashedPass,
            designation,
            address,
            phone,
            gender,
            subject,
            createdBy: res.locals.adminId, // Admin ID from middleware
        });

        await instructor.save();

        res.status(201).json({
            msg: "Instructor created successfully",
            instructor: {
                id: instructor._id,
                name: instructor.name,
                email: instructor.email,
            },
        });
    } catch (error) {
        console.error("Error creating instructor:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await instructorData.findOne({ email });

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
        const user = await instructorData.findOne({ email });
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
              <a href = "http://localhost:2022/instructors/resetpassword?token=${refreshToken}">RESET password</a>
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
        const user = await instructorData.findOne({
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


const createLecture = async (req, res) => {
    try {
        const { L_Name, L_Date, L_link, Subject, L_Type, L_Instructor } = req.body;
        console.log(L_Name, L_Date, L_link, Subject, L_Type, L_Instructor);

        // Check and parse L_Date
        const parsedDate = new Date(L_Date);

        // Validate the parsed date
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ message: "Invalid date format. Please provide a valid date (e.g., YYYY-MM-DD)." });
        }

        const newLecture = new creationData({
            createdBy: res.locals.adminId,
            L_Name,
            L_Date: parsedDate, // Use the parsed date
            L_link,
            Subject,
            L_Type,
            L_Instructor
        });

        console.log(newLecture);
        const savedLecture = await newLecture.save();

        res.status(201).json({ message: "Lecture created successfully.", lecture: savedLecture });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};







export { signUp, login, forgetpassword, resetpassword, createLecture };

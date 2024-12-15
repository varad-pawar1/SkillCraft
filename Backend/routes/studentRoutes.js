import express from "express";
import { forgetpassword, login, resetpassword, signUp } from "../controllers/studentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { scheduleStudent } from "../controllers/lectureController.js";

const studentRouter = express.Router();

studentRouter.post("/signUp", authMiddleware, signUp); // Protected route
studentRouter.post("/login", login); // Public route
studentRouter.post("/forgetpassword", forgetpassword);
studentRouter.post("/resetpassword", resetpassword);
studentRouter.get("/",scheduleStudent)
export { studentRouter };

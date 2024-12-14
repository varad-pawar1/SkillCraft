import express from "express";
import { login, signUp, forgetpassword, resetpassword } from "../controllers/instructorController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const instructorRouter = express.Router();

instructorRouter.post("/signUp", authMiddleware, signUp); // Protected route
instructorRouter.post("/login", login); // Public route
instructorRouter.post("/forgetpassword", forgetpassword);
instructorRouter.post("/resetpassword", resetpassword);
export { instructorRouter };

import express from "express";
import { login, signUp } from "../controllers/userController.js";
import {
  forgetpassword,
  resetpassword,
} from "../controllers/authController.js";

const userRouter = express.Router();

userRouter.post("/signUp", signUp);
userRouter.post("/login", login);
userRouter.post("/forgetpassword", forgetpassword);
userRouter.post("/resetpassword", resetpassword);
export { userRouter };

import argon2 from "argon2";
import { usersData } from "../models/userModel.js";
import "dotenv/config";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPass = await argon2.hash(password);
    const user = await usersData({ name, email, password: hashedPass });
    await user.save();
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usersData.findOne({ email });

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

export { signUp, login };

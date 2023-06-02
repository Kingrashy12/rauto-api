// import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import genAuthToken from "../utils/genAuthToken.js";

export const registerUser = async (req, res) => {
  try {
    const { name, username, password, email } = req.body;
    // const salt = await bcrypt.genSalt();
    // const hashedpassword = await bcrypt.hash(password, salt);
    const User = await UserModel.findOne({ email: email });
    if (User) return res.status(400).json("User Already exits.");

    const newUser = new UserModel({
      name,
      username,
      // password: hashedpassword,
      password,
      email,
    });
    const user = await newUser.save();
    const token = genAuthToken(user);
    res.status(201).json(token);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) return res.status(404).json({ meg: "User not found" });
    // const match = await bcrypt.compare(password, user.password);
    const match = await UserModel.findOne({ password: password });
    if (!match) return res.status(400).json("Invaild Password");
    const token = genAuthToken(user);
    res.status(200).json(token);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ meg: error.message });
  }
};

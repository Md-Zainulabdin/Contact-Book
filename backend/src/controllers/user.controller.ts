import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { verifyEmail } from "../helpers";


export const SignUpUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if ([name, email, password].some((field) => field.trim() === "")) {
      return res.status(400).json({ msg: "Every field is required!" });
    }

    if (verifyEmail(email)) {
      res.status(403).send({ message: `Please enter a valid Email!` });
      return;
    }

    const isUserExist = await User.findOne({
      email: email,
    });

    if (isUserExist) {
      return res
        .status(403)
        .json({ msg: "User with this email already exist!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    return res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    console.log(`User-Register-Error`);
    return res
      .status(500)
      .json({ msg: "An error occured while registering user" });
  }
};

export const removeUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ msg: "id is required!" });
    }

    const deletedUser = await User.deleteOne({
      _id: id,
    });

    return res.status(200).json({ msg: "User deleted!" });
  } catch (error) {
    console.log(`User-Removed-Error`);
    return res
      .status(500)
      .json({ msg: "An error occured while removing user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const { name, email } = req.body;

    if ([name, email].some((field) => field.trim() === "")) {
      return res.status(400).json({ msg: "Every field is required!" });
    }

    if (!id) {
      return res.status(400).json({ msg: "id is required!" });
    }

    const updatedUser = await User.findOneAndUpdate({
      _id: id,
      name,
      email,
    });

    return res.status(200).json({ msg: "User Updated!", user: updatedUser });
  } catch (error) {
    console.log(`User-Updated-Error`);
    return res
      .status(500)
      .json({ msg: "An error occured while updating user" });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ users });
  } catch (error) {
    console.log(`User-Get-Error`);
    return res.status(500).json({ msg: "An error occured while getting user" });
  }
};

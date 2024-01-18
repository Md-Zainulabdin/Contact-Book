import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import User from "../models/user.model";
import { verifyEmail } from "../helpers";

/**
 * @route GET /api/v1/users
 * @desc Get all new users
 * @access public
 */

export const getAllUser = async (req: Request, res: Response) => {
  try {
      const users = await User.find({}).select("name email");
      return res.status(200).json({ users });
  } catch (error) {
      console.log(`User-Get-Error`, error);
      return res.status(500).json({ msg: "An error occured while getting user" });
  }
};

/**
 * @route POST /api/v1/user
 * @desc Create a new user
 * @access public
 */

export const SignUpUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

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

/**
 * @route DELETE /api/v1/user/:id
 * @desc Delete a new user
 * @access private
 */

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

/**
 * @route PUT /api/v1/user/:id
 * @desc Update a new user
 * @access private
 */

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ msg: "id is required!" });
    }

    const { name, email } = req.body;

    let userFields: any = {}; 

    if (name) userFields.name = name;
    if (email) userFields.email = email;

    let user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        msg: 'User not found',
      });
    }

    if (req.body?.user && req.body?.user.id.toString() !== user.id.toString()) {
      return res.status(401).json({
        msg: 'Invalid authorization',
      });
    }

    user = await User.findByIdAndUpdate(
      id,
      { $set: userFields },
      { new: true }, 
    ).select("-password");

    return res.status(200).json({ msg: "User Updated!", user });
  } catch (error) {
    console.log(`User-Updated-Error`, error);
    return res
      .status(500)
      .json({ msg: "An error occurred while updating user" });
  }
};


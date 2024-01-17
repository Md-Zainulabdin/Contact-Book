import { Request, Response } from "express";
import { validationResult } from "express-validator"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.model";

export const loginUser = async (req: Request, res: Response) => {
    // Get the validation result.
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    const { email, password } = req.body;

    try {
        // Find user by email address and check if the password is correct.

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                msg: 'User not exists.',
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                msg: 'Invalid password',
            });
        }

        const payload = {
                id: user.id,
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET as string,
            {
                expiresIn: '1d',
            },
            (err, token) => {
                if (err) throw err;
                return res.json({
                    token,
                });
            }
        );

    } catch (error) {
        console.log("Error in auth", error);
        return res.status(500).send("Internal Server Error");
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.body?.user.id).select('-password');
        return res.json(user);
    } catch (err: any) {
        console.error(err.message);
        res.status(500).json({
            msg: 'Server error',
        });
    }
}
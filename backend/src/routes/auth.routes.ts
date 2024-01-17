import express from "express";
import { check } from "express-validator";
import { getUser, loginUser } from "../controllers/auth.controller";
import auth from "../middlewares/auth";

const router = express.Router();

// routes
router.route("/login").post(
  [
    check("email", "Email is required!").not().isEmpty(),
    check("password", "Password is required!").isLength({
      min: 6,
      max: 15,
    }),
  ],
  loginUser
);
router.route("/authUser").get(auth, getUser)

export default router;

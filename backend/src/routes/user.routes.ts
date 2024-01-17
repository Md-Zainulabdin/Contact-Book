import { Router } from "express";
import {
  SignUpUser,
  getAllUser,
  removeUser,
  updateUser,
} from "../controllers/user.controller";
import { check } from "express-validator";
import auth from "../middlewares/auth"

const router = Router();

router.route("/users").get(getAllUser);
router.route("/user").post(
  [
    check("name", "Name is required!").not().isEmpty(),
    check("email", "Email is required!").isEmail(),
    check("password", "Password is required!").isLength({
      min: 6,
      max: 15,
    }),
  ],
  SignUpUser
);
router.route("/user/:id").put(auth, updateUser);
router.route("/user/:id").delete(auth, removeUser);

export default router;

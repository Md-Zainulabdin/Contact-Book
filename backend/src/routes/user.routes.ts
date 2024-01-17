import { Router } from "express";
import {
  SignUpUser,
  getAllUser,
  removeUser,
  updateUser,
} from "../controllers/user.controller.ts";

const router = Router();

router.route("/users").get(getAllUser);
router.route("/user").post(SignUpUser);
router.route("/user/:id").put(updateUser);
router.route("/user/:id").delete(removeUser);

export default router;

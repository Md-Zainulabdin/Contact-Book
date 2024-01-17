import express from "express";
import auth from "../middlewares/auth";
import {
  createContact,
  updateContact,
  deleteContact,
  getAllContacts,
} from "../controllers/contact.controller";
import { check } from "express-validator";
const router = express.Router();

// routes
router
  .route("/contact")
  .post(
    auth,
    [
      check("name", "Name is required!").not().isEmpty(),
      check("email", "Email is required!").isEmail(),
      check("phone", "phone number is required!").not().isEmpty(),
    ],
    createContact
  );
router.route("/contact/:id").put(auth, updateContact);
router.route("/contact/delete/:id").delete(auth, deleteContact);
router.route("/contacts").get(auth, getAllContacts);

export default router;

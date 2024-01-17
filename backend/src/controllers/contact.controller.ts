import type { Request, Response } from "express";
import Contact from "../models/contact.model";
import { validationResult } from "express-validator";

export const createContact = async (req: Request, res: Response) => {
  try {
    const { name, email, phone } = req.body;
    

    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      user: req.body?.user.id,
    });

    return res.status(201).json({ msg: "Contact created!", contact });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateContact = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ msg: "ContactId is required!" });
    }

    const { name, email, phone } = req.body;

    const contactFields: any = {};

    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;

    let contact = await Contact.findById(id);

    if (!contact) {
      return res.status(400).json({
        msg: "Contact not found",
      });
    }

    const userFromRequest = req.body?.user;

    if (
      !userFromRequest ||
      userFromRequest.id.toString() !== contact?.user?.toString()
    ) {
      res.status(401).json({
        msg: "Invalid authorization",
      });
    }

    contact = await Contact.findByIdAndUpdate(
      id,
      { $set: contactFields },
      { new: true }
    );

    return res.status(200).json({ msg: "Contact Updated!", contact });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ msg: "id is required!" });
    }

    let contact = await Contact.findById(id);

    if (!contact) {
      return res.status(400).json({
        msg: "Contact not found",
      });
    }

    const userFromRequest = req.body?.user;

    if (
      !userFromRequest ||
      userFromRequest.id.toString() !== contact?.user?.toString()
    ) {
      res.status(401).json({
        msg: "Invalid authorization",
      });
    }

    const deletedContact = await Contact.deleteOne({
      _id: id,
    });

    return res.status(200).json({ msg: "Contact deleted!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find().sort({
      created_at: -1,
    });

    return res.status(200).json({ contacts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

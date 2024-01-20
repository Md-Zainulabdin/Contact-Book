import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  phone: { type: String, required: true },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;

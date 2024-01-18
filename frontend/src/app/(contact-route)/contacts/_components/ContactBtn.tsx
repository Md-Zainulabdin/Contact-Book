"use client";

import { Modal } from "@/components/ui/modal";
import { useState } from "react";
import ContactForm from "./contactForm";
import { Button } from "@/components/ui/button";

const ContactBtn = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal
        title="Create Contact"
        description="Add new contact in your contact list"
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <ContactForm onClose={() => setOpen(false)} />
      </Modal>

      <Button onClick={() => setOpen(true)}>
        <span>Create Contact</span>
      </Button>
    </>
  );
};

export default ContactBtn;

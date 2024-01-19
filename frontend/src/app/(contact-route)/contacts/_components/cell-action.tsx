"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

// import AlertModal from "@/components/modals/Alert-Modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { Contact } from "@/types";
import AlertModal from "@/components/modal/Alert-modal";
import { getToken } from "@/helpers";
import { baseUrl } from "@/constants";
import { Modal } from "@/components/ui/modal";
import ContactForm from "./contactForm";
// import AlertModal from "@/components/modals/Alert-Modal";

interface CellActionProps {
  data: Contact;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const router = useRouter();

  const onDeleteHandler = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      await axios.delete(`${baseUrl}/contact/${data._id}`, {
        headers: {
          Authorization: `${token?.value}`,
        },
      });
      router.refresh();
    } catch (error) {
      console.log("Error deleting contact", error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDeleteHandler}
        loading={loading}
      />

      <Modal
        title="Update Contact"
        onClose={() => setUpdateOpen(false)}
        isOpen={updateOpen}
        description="update your contact with new data"
      >
        <ContactForm initialData={data} onClose={() => setUpdateOpen(false)} />
      </Modal>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0" size={"icon"}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setUpdateOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

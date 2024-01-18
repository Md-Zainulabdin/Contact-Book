import React from "react";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import ContactBtn from "./_components/ContactBtn";
import axios from "axios";
import { baseUrl } from "@/constants";
import { Contact } from "@/types";
import { getToken } from "@/helpers";

const getContacts = async () => {
  const token = await getToken();
  const response = await axios.get(`${baseUrl}/contacts`, {
    headers: {
      Authorization: `${token?.value}`,
    },
  });
  return response.data;
};

const ContactPage = async () => {
  const {contacts} = await getContacts();

  return (
    <div className="m-auto my-12 max-w-7xl px-12">
      <div className="header flex w-full items-center justify-between pb-12">
        <div>
          <h1 className="text-2xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
            Your Contacts
          </h1>
        </div>

        <div className="pr-4">
          <ContactBtn />
        </div>
      </div>

      <div>
        <DataTable columns={columns} data={contacts} />
      </div>
    </div>
  );
};

export default ContactPage;

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const ContactLayout = ({ children }: { children: React.ReactNode }) => {
  const cookie = cookies();
  
  if (!cookie.get("auth_token")) {
    redirect("/auth/login");
  }

  return <div>{children}</div>;
};

export default ContactLayout;

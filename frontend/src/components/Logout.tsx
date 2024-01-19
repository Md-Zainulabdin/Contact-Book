"use client";
import { Button } from "@/components/ui/button";
import { deleteToken } from "@/helpers";

const Logout: React.FC = () => {
  const logout = async () => {
    deleteToken();
  };
  return (
    <Button size={"sm"} variant={"outline"} onClick={() => logout()}>
      Logout
    </Button>
  );
};

export default Logout;

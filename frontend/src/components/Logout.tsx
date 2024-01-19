"use client";
import { Button } from "@/components/ui/button";
import { deleteToken } from "@/helpers";
import { useRouter } from "next/navigation";

const Logout: React.FC = () => {
  const router = useRouter();
  const logout = async () => {
    deleteToken();
  };
  return (
    <Button
      size={"sm"}
      variant={"outline"}
      onClick={() => {
        logout();
        router.push("/");
      }}
    >
      Logout
    </Button>
  );
};

export default Logout;

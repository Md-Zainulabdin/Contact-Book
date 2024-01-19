import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Logout from "./Logout";

const Navbar = () => {
  const cookie = cookies();
  const session = cookie.get("auth_token");

  return (
    <nav className="flex h-20 w-full items-center justify-between border-b px-4 md:px-16">
      <div className="logo">
        <Link href={"/"}>
          <h1 className="text-2xl font-bold tracking-tighter sm:text-2xl">
            Contact <span className="text-primary"> Book</span>
          </h1>
        </Link>
      </div>

      <div className="menu space-x-6">
        <Link href={"/contacts"}>
          <span className="font-medium text-muted-foreground">Contacts</span>
        </Link>

        {session ? (
          <Logout />
        ) : (
          <Button size={"sm"} className="px-6">
            <Link href="/auth/login">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="m-auto my-20 max-w-5xl space-y-10 px-3 md:my-36">
      <div className="flex flex-col items-center justify-center space-y-5 text-center">
        <div className="space-y-2">
          <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
            Manage Your Contacts
          </h1>
          <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
            With <span className="text-primary">Contact Book</span>
          </h1>
        </div>

        <p className="text-muted-foreground min-w-[300px] max-w-xl text-sm sm:text-lg">
          Streamline your contacts with our user-friendly Contact Management
          System. Authenticate, create, and access your contacts effortlessly
          for efficient organization.
        </p>

        <div className="pt-4">
          <Button size={"lg"}>
            <Link href={"/contacts"}>See Contacts</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

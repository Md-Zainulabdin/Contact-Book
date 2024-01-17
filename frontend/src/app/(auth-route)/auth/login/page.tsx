import Link from "next/link";
import LoginForm from "../_components/loginForm";

const LoginPage = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="my-10 w-[400px] space-y-12 p-4 sm:my-16 md:my-32">
        <div>
          <h1 className="text-center text-2xl font-bold tracking-tighter sm:text-3xl">
            Login to Contact <span className="text-primary">Book</span> 
          </h1>
        </div>
        <div className="space-y-3 rounded-md border p-4 shadow-sm">
          <LoginForm />

          <div className="w-full text-center">
            <span className="text-sm text-muted-foreground">
              Dont have account,{" "}
              <Link
                className="font-medium text-primary hover:underline"
                href={"/auth/signup"}
              >
                Signup!
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

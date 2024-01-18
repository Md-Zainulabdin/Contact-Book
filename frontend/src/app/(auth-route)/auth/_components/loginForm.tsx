"use client";
// Import necessary modules and components

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { baseUrl } from "@/constants";
import { setToken } from "@/helpers";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the form schema
const formSchema = z.object({
  email: z.string().min(2, "Email is required!").max(50),
  password: z
    .string()
    .min(8, "Your password must contain at least 8 characters")
    .max(50),
});

type LoginFormValues = z.infer<typeof formSchema>;

// Define the LoginForm component
const LoginForm: React.FC = () => {
    // Spinner
    const Icons = {
      spinner: Loader2,
    };
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/login`, data);

      if (response?.data?.token) {
        // Save token to cookie and redirect user to dashboard page
        const token = response?.data?.token;
        setToken(token);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="form-area">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-normal text-muted-foreground">
                    Email address
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-normal text-muted-foreground">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={loading} type="submit" className="w-full">
            {loading && <Icons.spinner className="h-4 w-4 animate-spin mr-2" />}
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;

"use client";

// Import necessary modules and components
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { baseUrl } from "@/constants";

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
import { Contact } from "@/types";
import { useRouter } from "next/navigation";
import { getToken } from "@/helpers";

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, "Name is required!").max(50),
  email: z.string().min(2, "Email is required!").max(50),
  phone: z
    .string()
    .min(8, "Phone number must contain at least 8 characters")
    .max(15),
});

type ContactFormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  initialData?: Contact;
  onClose?: () => void;
}

// Define the ContactForm component
const ContactForm: React.FC<ContactFormProps> = ({ initialData, onClose }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setLoading(true);
    
    try {
      if (initialData) {
        const response = await axios.put(
          `${baseUrl}/contact/${initialData._id}`,
          data
        );

        router.push("/contacts");
        // Check if onClose is defined before calling it
        onClose && onClose();
        router.refresh();
      } else {
        const token = await getToken();
        
        const response = await axios.post(`${baseUrl}/contact`, data, {
          headers: {
            "Authorization": `${token?.value}`,
          },
        });
        onClose && onClose();
        router.refresh();
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-normal text-muted-foreground">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              name="phone"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-normal text-muted-foreground">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your phone number..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {initialData ? (
              <Button disabled={loading} type="submit" className="w-full">
                Update
              </Button>
            ) : (
              <Button disabled={loading} type="submit" className="w-full">
                Create
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;

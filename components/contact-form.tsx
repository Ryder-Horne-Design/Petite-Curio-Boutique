"use client";
import z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SendEmail } from "./actions";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";

export default function ContactForm() {
  const ContactFormSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    subject: z.string(),
    message: z.string(),
  });
  const ContactReactForm = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    },
  });

  const { toast } = useToast();

  async function ContactSubmit(Data: z.infer<typeof ContactFormSchema>) {
    toast({
      title: "Sending Contact Form",
      description: "Please wait while we send your contact form data to our team.",
    });
    const EmailResponse = await SendEmail({
      email: Data.email,
      subject: Data.subject,
      message: Data.message,
    });
    if (EmailResponse.success) {
      toast({
        title: "Contact Form Successfully Sent!",
        description: "Your contact form data has successfully been sent to our team! Expect a response within 3 - 5 business days.",
        variant: "success",
      });  
    } else {
      toast({
        title: "Error Sending Contact Form",
        description: "Your contact form data was not sent to our team due to an error. Please try again.",
        variant: "destructive",
      });  
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact</CardTitle>
        <CardDescription>Fill out the form below to contact us, or <a href="mailto:petitecurioboutique@gmail.com" className="text-yellow-500 transition-colors duration-300 hover:text-yellow-600 focus:text-yellow-600">email us</a>.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...ContactReactForm}>
          <form onSubmit={ContactReactForm.handleSubmit(ContactSubmit)}>
            <FormField control={ContactReactForm.control} name="email" render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} />
                </FormControl>
                <FormDescription>The email you&apos;d like us to send our response to.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={ContactReactForm.control} name="subject" render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="Your subject" {...field} />
                </FormControl>
                <FormDescription>The subject of your inquiry.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={ContactReactForm.control} name="message" render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Your message" className="resize-none" {...field} />
                </FormControl>
                <FormDescription>The message you&apos;d like for our team to see and respond to.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit">Send</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
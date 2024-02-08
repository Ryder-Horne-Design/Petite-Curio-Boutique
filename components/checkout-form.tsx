"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { CreateCheckoutSession } from "./actions";

export default function CheckoutForm({ items, measurements, total }: {
  items: {
    price: string,
    quantity: number,
  }[],
  measurements: {
    pounds: number,
    ounces: number,
    width: number,
    length: number,
    height: number,
    value: number,
  }[],
  total: number,
}) {
  const CheckoutFormSchema = z.object({
    first: z.string().min(2, {
      message: "Your first name must be at least 2 characters or longer.",
    }),
    last: z.string().min(2, {
      message: "Your first name must be at least 2 characters or longer.",
    }),
    country: z.string().regex(/us|mx|ca/, {
      message: "Invalid country.",
    }),
    al1: z.string(),
    al2: z.string().optional(),
    zip: z.string().min(5, {
      message: "Your ZIP code must be at least 5 characters.",
    }).max(6, {
      message: "Your ZIP code cannot be longer than 6 characters.",
    }),
    state: z.string(),
    city: z.string(),
  });
  const CheckoutReactForm = useForm<z.infer<typeof CheckoutFormSchema>>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues: {
      first: "",
      last: "",
      country: "",
      al1: "",
      al2: "",
      zip: "",
      state: "",
      city: "",
    },
  });

  const { toast } = useToast();
  const Router = useRouter();
  
  async function CheckoutSubmit(Data: z.infer<typeof CheckoutFormSchema>) {
    try {
      toast({
        title: "Creating checkout session...",
        description: "Please wait while we create your checkout session.",
      });
      const Checkout = JSON.parse(await CreateCheckoutSession({
        items,
        country: Data.country,
        zip: Data.zip,
        measurements,
        name: Data.first + " " + Data.last,
        city: Data.city,
        al1: Data.al1,
        al2: Data.al2,
        state: Data.state,
        total,
      }));
      if (Checkout.success) {
        toast({
          title: "Success",
          description: "Your checkout session was created successfully. Please wait while you're redirected.",
          variant: "success",
        });
        Router.push(Checkout.url!);
      } else {
        toast({
          title: "Error",
          description: "There was an error creating your checkout session. Please try again.",
          variant: "destructive",
        });
      };
    } catch(Err) {
      toast({
        title: "Error",
        description: "There was an error creating your checkout session. Please try again.",
        variant: "destructive",
      });
      console.warn(Err);
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
        <CardDescription>Fill out the form below to checkout. All fields marked with a red asterik <span className="text-red-600">*</span> are required.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...CheckoutReactForm}>
          <form onSubmit={CheckoutReactForm.handleSubmit(CheckoutSubmit)}>
            <div className="flex flex-col flex-wrap md:flex-row md:flex-nowrap gap-4">
              <FormField control={CheckoutReactForm.control} name="first" render={({ field }) => (
                <FormItem className="mb-2 basis-full md:basis-1/2">
                  <FormLabel>
                    First Name:{" "}
                    <span className="text-red-600">
                      *
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your first name" {...field} />
                  </FormControl>
                  <FormDescription>Your first name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={CheckoutReactForm.control} name="last" render={({ field }) => (
                <FormItem className="mb-2 basis-full md:basis-1/2">
                  <FormLabel>
                    Last Name:{" "}
                    <span className="text-red-600">
                      *
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your last name" {...field} />
                  </FormControl>
                  <FormDescription>Your last name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={CheckoutReactForm.control} name="country" render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>
                  Country:{" "}
                  <span className="text-red-600">
                    *
                  </span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="The country you live in." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="mx">Mexico</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>The country you live in.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            <div className="flex flex-col flex-wrap md:flex-row md:flex-nowrap gap-4">
              <FormField control={CheckoutReactForm.control} name="al1" render={({ field }) => (
                <FormItem className="mb-2 basis-full md:basis-1/2">
                  <FormLabel>
                    Address Line 1:{" "}
                    <span className="text-red-600">
                      *
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your 1st address line" {...field} />
                  </FormControl>
                  <FormDescription>The 1st line of your address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={CheckoutReactForm.control} name="al2" render={({ field }) => (
                <FormItem className="mb-2 basis-full md:basis-1/2">
                  <FormLabel>
                    Address Line 2:
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your 2nd address line" {...field} />
                  </FormControl>
                  <FormDescription>The 2nd line of your address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={CheckoutReactForm.control} name="zip" render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>
                  ZIP Code:{" "}
                  <span className="text-red-600">
                    *
                  </span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Your ZIP code" {...field} />
                </FormControl>
                <FormDescription>The ZIP code of your city.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={CheckoutReactForm.control} name="state" render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>
                  State/Province:{" "}
                  <span className="text-red-600">
                    *
                  </span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Your state/province" {...field} />
                </FormControl>
                <FormDescription>The state or province you live in.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={CheckoutReactForm.control} name="city" render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>
                  City:{" "}
                  <span className="text-red-600">
                    *
                  </span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Your city" {...field} />
                </FormControl>
                <FormDescription>The city you live in.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
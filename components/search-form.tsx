"use client";
import z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function SearchForm() {
  const SearchFormSchema = z.object({
    search: z.string().optional(),
  });
  const SearchReactForm = useForm<z.infer<typeof SearchFormSchema>>({
    resolver: zodResolver(SearchFormSchema),
    defaultValues: {
      search: "",
    },
  });

  const Router = useRouter();
  const Path = usePathname();
  function SearchSubmit(Data: z.infer<typeof SearchFormSchema>) {
    Router.push(`${Path}?search=${Data.search}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search</CardTitle>
        <CardDescription>Search products based on name.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...SearchReactForm}>
          <form onSubmit={SearchReactForm.handleSubmit(SearchSubmit)}>
            <FormField control={SearchReactForm.control} name="search" render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Search</FormLabel>
                <FormControl>
                  <Input placeholder="Your search" {...field} />
                </FormControl>
                <FormDescription>The name of the product you're searching for.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit">Search</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
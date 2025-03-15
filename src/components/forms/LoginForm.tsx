"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginFormValidationSchema,
  LoginFormValidationSchemaType,
} from "@/schemas/auth.schema";
import { useLogin } from "@/hooks/service-hooks/auth.hook";
import { useAxios } from "@/hooks/use-axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function LoginForm() {
  const { mutate, isPending } = useLogin();
  const { publicRequest } = useAxios();

  const form = useForm({
    resolver: zodResolver(loginFormValidationSchema),

    defaultValues: {
      password: "",
      email: "",
    },
  });

  const onSubmit = async (data: LoginFormValidationSchemaType) => {
    mutate({ publicRequest: publicRequest, payload: data });
  };
  const { handleSubmit, control } = form;
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-md space-y-8 py-10 p-5 md:p-10 border-[1px] md:w-[30%] w-full"
      >
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} className="btn btn-primary" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

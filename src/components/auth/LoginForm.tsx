"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginFormValidationSchema,
  LoginFormValidationSchemaType,
} from "@/schemas/auth.schema";
import { useLogin } from "@/hooks/service-hooks/auth.hook";
import { useAxios } from "@/hooks/use-axios";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import FormPasswordField from "../form-fields/FormPasswordField";
import FormInputField from "../form-fields/FormInput";
import { LoadingDialog } from "../LoadingDialog";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;
  return (
    <Form {...form}>
      <LoadingDialog loadingText="Logging in ..." open={isPending}>
        <DotLottieReact src="animations/auth-lock.lottie" loop autoplay />
      </LoadingDialog>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-md space-y-6 py-10 p-5 md:p-10 border-[1px] w-full"
      >
        <FormInputField
          control={control}
          name="email"
          label="Email"
          type="email"
          id="email"
          placeholder="Contact email"
          errorMessage={errors.email?.message}
        />

        <FormPasswordField
          control={control}
          name="password"
          label="Password"
          id="password"
          placeholder="Enter password"
          errorMessage={errors.password?.message}
        />

        <Button
          disabled={isPending}
          className={cn("btn btn-primary w-full", { "animate-pulse": isPending })}
          type="submit"
        >
          {isPending ? "Loading..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}

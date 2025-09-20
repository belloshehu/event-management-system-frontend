"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signupFormValidationSchema,
  SignupFormValidationSchemaType,
} from "@/schemas/auth.schema";
import { useSignup } from "@/hooks/service-hooks/auth.hook";
import { useAxios } from "@/hooks/use-axios";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import FormInputField from "../form-fields/FormInput";
import FormPasswordField from "../form-fields/FormPasswordField";
import { LoadingDialog } from "../LoadingDialog";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function SignupForm() {
  const { mutateAsync, isPending } = useSignup();
  const { publicRequest } = useAxios();

  const form = useForm({
    resolver: zodResolver(signupFormValidationSchema),

    defaultValues: {
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      passwordRepeat: "",
    },
  });

  const onSubmit = async (data: SignupFormValidationSchemaType) => {
    await mutateAsync({ publicRequest: publicRequest, payload: data });
    // form.reset();
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;
  return (
    <Form {...form}>
      <LoadingDialog loadingText="Signing up ..." open={isPending}>
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

        <FormInputField
          control={control}
          name="firstName"
          label="First name"
          type="text"
          id="firstName"
          placeholder="Enter first name"
          errorMessage={errors.firstName?.message}
        />

        <FormInputField
          control={control}
          name="lastName"
          label="Last name"
          type="text"
          id="lastName"
          placeholder="Enter last name"
          errorMessage={errors.lastName?.message}
        />

        <FormPasswordField
          control={control}
          name="password"
          label="Password"
          id="password"
          placeholder="Enter password"
          errorMessage={errors.password?.message}
        />

        <FormPasswordField
          control={control}
          name="passwordRepeat"
          label="Password Repeat"
          id="passwordRepeat"
          placeholder="Enter password again"
          errorMessage={errors.passwordRepeat?.message}
        />

        <Button
          disabled={isPending}
          className={cn("btn btn-primary w-full", { "animate-pulse": isPending })}
          type="submit"
        >
          {isPending ? "Loading..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}

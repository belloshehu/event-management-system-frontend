"use client";
import Brand from "@/components/Brand";
import AuthPageContentWrapper from "@/components/auth/AuthPageContentWrapper";
import LoginForm from "@/components/auth/LoginForm";
import PageWrapper from "@/components/page/PageWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <PageWrapper>
      <AuthPageContentWrapper>
        <div className="w-full md:w-3/5 space-y-3 h-full">
          <div className="flex justify-between items-center w-full p-5 bg-slate-900 rounded-md bg-[url(/event3.jpg)] bg-center bg-no-repeat bg-cover bg-blend-overlay">
            <Brand />
            <h5 className="font-normal text-2xl text-center block text-white">Login</h5>
          </div>
          <LoginForm />

          <div className="flex items-center justify-center gap-5 w-full">
            <p className="">Have no account?</p>
            <Link href="/signup">
              <Button variant={"outline"}>Signup</Button>
            </Link>
          </div>
        </div>
      </AuthPageContentWrapper>
    </PageWrapper>
  );
}

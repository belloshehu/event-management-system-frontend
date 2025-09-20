import Brand from "@/components/Brand";
import AuthPageContentWrapper from "@/components/auth/AuthPageContentWrapper";
import SignupForm from "@/components/auth/SignupForm";
import PageWrapper from "@/components/page/PageWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignupPage() {
  return (
    <PageWrapper>
      <AuthPageContentWrapper>
        <div className="w-full md:w-3/5 space-y-3">
          <div className="flex justify-between items-center w-full p-5 bg-slate-900 rounded-md bg-[url(/event3.jpg)] bg-center bg-no-repeat bg-cover bg-blend-overlay">
            <Brand />
            <h1 className="font-normal text-2xl text-center block text-white">Signup</h1>
          </div>
          <SignupForm />

          <div className="flex items-center justify-center gap-5">
            <p>Have an account?</p>
            <Link href="/login">
              <Button variant={"outline"}>Login</Button>
            </Link>
          </div>
        </div>
      </AuthPageContentWrapper>
    </PageWrapper>
  );
}

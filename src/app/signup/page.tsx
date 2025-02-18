import Brand from "@/components/Brand";
import SignupForm from "@/components/forms/SignupForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignupPage() {
	return (
		<div className="flex items-center justify-center min-h-screen flex-col gap-10 p-10 py-20">
			<div className="flex justify-between items-center w-full md:w-[30%] px-5 bg-green-50 p-10">
				<Brand />
				<h1 className="font-bold text-3xl text-center block underline">
					Signup
				</h1>
			</div>
			<SignupForm />

			<div className="flex items-center justify-center gap-5">
				<p>Have an account?</p>
				<Link href="/login">
					<Button variant={"outline"}>Login</Button>
				</Link>
			</div>
		</div>
	);
}

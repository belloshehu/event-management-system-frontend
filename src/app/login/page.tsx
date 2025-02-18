import Brand from "@/components/Brand";
import LoginForm from "@/components/forms/LoginForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
	return (
		<div className="flex items-center justify-center min-h-screen flex-col gap-10 p-10 py-20">
			<div className="flex justify-between items-center w-full md:w-[30%] px-5 bg-green-50 p-10">
				<Brand />
				<h1 className="font-bold text-3xl text-center block underline">
					Login{" "}
				</h1>
			</div>
			<LoginForm />

			<div className="flex items-center justify-center gap-5">
				<p>Have no account?</p>
				<Link href="/signup">
					<Button variant={"outline"}>Signup</Button>
				</Link>
			</div>
		</div>
	);
}

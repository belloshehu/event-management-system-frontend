import Brand from "@/components/Brand";
import LoginForm from "@/components/forms/LoginForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
	return (
		<div className="flex items-center justify-center min-h-screen flex-col gap-10 p-5 py-20">
			<div className="flex justify-between items-center w-full md:w-[30%] p-5 bg-slate-900 rounded-md bg-[url(/event3.jpg)] bg-center bg-no-repeat bg-cover bg-blend-overlay">
				<Brand />
				<h1 className="font-bold text-2xl text-center block underline text-white">
					Login
				</h1>
			</div>
			<LoginForm />

			<div className="flex items-center justify-center gap-5">
				<p className="">Have no account?</p>
				<Link href="/signup">
					<Button variant={"outline"}>Signup</Button>
				</Link>
			</div>
		</div>
	);
}

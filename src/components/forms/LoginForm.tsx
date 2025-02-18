import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function LoginForm() {
	return (
		<form className="flex flex-col gap-5 rounded-md p-10 bg-slate-100 md:w-[30%] w-full">
			<div className="flex flex-col gap-2">
				<Label htmlFor="email">Email</Label>
				<Input type="email" id="email" />
			</div>
			<div className="flex flex-col gap-2">
				<Label htmlFor="password">Password</Label>
				<Input type="password" id="password" />
			</div>
			<Button className="btn btn-primary">Submit</Button>
		</form>
	);
}

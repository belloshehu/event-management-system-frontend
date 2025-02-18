import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function SignupForm() {
	return (
		<form className="flex flex-col gap-5 rounded-md py-10 p-5 md:p-10 border-[1px] md:w-[30%] w-full">
			<div className="flex flex-col gap-2">
				<Label htmlFor="email">Email</Label>
				<Input type="email" id="email" />
			</div>
			<div className="flex flex-col gap-2">
				<Label htmlFor="first-name">First name</Label>
				<Input type="text" id="first-name" />
			</div>
			<div className="flex flex-col gap-2">
				<Label htmlFor="last-name">Last name</Label>
				<Input type="text" id="last-name" />
			</div>
			<div className="flex flex-col gap-2">
				<Label htmlFor="password">Password</Label>
				<Input type="password" id="password" />
			</div>
			<div className="flex flex-col gap-2">
				<Label htmlFor="password">Password Repeat</Label>
				<Input type="password" id="password-repeat" />
			</div>
			<Button className="btn btn-primary">Submit</Button>
		</form>
	);
}

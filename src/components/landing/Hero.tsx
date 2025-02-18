import { Button } from "@/components/ui/button";

export default function Hero() {
	return (
		<section className="flex flex-col items-center rounded-md justify-center max-h-fit py-2 gap-10 w-full text-center bg-[url(/event3.jpg)] bg-green-900 bg-blend-overlay bg-center  bg-no-repeat bg-cover">
			<div className=" p-10 md:p-20 rounded-md text-white flex flex-col items-center justify-center w-full h-fit gap-10">
				<h1 className="  font-extrabold text-5xl md:text-7xl text-white w-full text-wrap text-center">
					Welcome to {process.env.NEXT_PUBLIC_BUSINESS_NAME} Event Centers
				</h1>
				<p className="">
					Renting an event center has never been easier, <br /> we make it
					seamless for you.
				</p>
				<p>Your all-in-one place for event centers, entertainment and more.</p>
				<Button variant={"secondary"} size={"lg"}>
					Get Started
				</Button>
			</div>
		</section>
	);
}

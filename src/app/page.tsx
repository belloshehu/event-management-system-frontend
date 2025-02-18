"use client";
import Hero from "@/components/landing/Hero";
import Section from "@/components/landing/Section";

export default function Home() {
	return (
		<main className="relative flex flex-col items-center justify-start py-2 gap-20 w-full p-5 md:p-20 text-center">
			<Hero />

			<Section
				imageUrl="/event2.jpg"
				heading="We provide all you need for your event"
				description="	You can rent event center, with entertainment and catering services
						all in one order"
			/>

			<Section
				imageUrl="/event3.jpg"
				heading="Are you an event center hall owener"
				buttonText="Register with us"
				description="Partner with us to have your event hall listed on our platform"
				reversed
			/>

			<Section
				imageUrl="/entertainment.jpg"
				heading="Are you an entertainer"
				buttonText="Register with us"
				description="	Partner with us to join the list of entertainers offering services in various events in our centers"
				reversed
			/>
		</main>
	);
}

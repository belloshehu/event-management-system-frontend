import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

type SectionProps = {
	// Props type definition
	reversed?: boolean;
	heading: string;
	description: string;
	buttonText?: string;
	imageUrl: string;
};
export default function Section({
	reversed,
	imageUrl,
	buttonText,
	description,
	heading,
}: SectionProps) {
	return (
		<motion.section
			initial={{ scale: 0.4, opacity: 0.8 }}
			whileInView={{ scale: 1, opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-green-50  p-3 md:p-20"
		>
			<Image
				src={imageUrl}
				alt="event"
				width={300}
				height={300}
				className={cn("object-cover w-full rounded-md", {
					"order-2": reversed,
					"order-1": !reversed,
				})}
			/>
			<div
				className={cn("text-left flex flex-col gap-4", {
					"order-1": reversed,
					"order-2": !reversed,
				})}
			>
				<h1 className="font-bold text-5xl text-green-600">{heading}</h1>
				<p>{description}</p>
				{buttonText && (
					<Button size={"lg"} className="mt-10">
						{buttonText}
					</Button>
				)}
			</div>
		</motion.section>
	);
}

import Image from "next/image";
import Link from "next/link";

export default function Brand() {
	return (
		<Link className="flex items-center gap-5" href={"/"}>
			<Image
				alt="logo"
				src={"/logo.png"}
				width={150}
				height={60}
				className="object-cover"
			/>
		</Link>
	);
}

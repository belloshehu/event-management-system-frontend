import Link from "next/link";

export default function Brand() {
	return (
		<Link className="flex items-center gap-5" href={"/"}>
			<h5 className="text-2xl font-bold font-cursive text-green-500">
				{process.env.NEXT_PUBLIC_BUSINESS_NAME}
			</h5>
		</Link>
	);
}

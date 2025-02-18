import Link from "next/link";
import Image from "next/image";
import SearchInput from "./SearchInput";
export default function Header() {
	return (
		<header className="flex items-center justify-between p-5 shadow-none md:px-10">
			<div className="flex items-center gap-5">
				<Image src="/vercel.svg" alt="logo" width={50} height={50} />
				<h1 className="text-2xl font-bold">
					{process.env.NEXT_PUBLIC_BUSINESS_NAME}
				</h1>
			</div>
			<SearchInput
				placeholder="Search for event centers"
				className="w-[30%] m-auto"
			/>
			<nav className="flex items-center gap-5">
				<Link href="/">Home</Link>
				<Link href="/about">About</Link>
				<Link href="/contact">Contact</Link>
			</nav>
		</header>
	);
}

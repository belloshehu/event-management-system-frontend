import { Inter, Roboto_Mono, Anton } from "next/font/google";

// Configure font with subsets and weights
export const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-inter",
});

export const robotoMono = Roboto_Mono({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-mono",
});

export const anton = Anton({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-anton",
});

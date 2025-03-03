"use client";
import EventCenterList from "@/components/event-center/EventCenterList";
import SearchInput from "@/components/SearchInput";
import { useMediaQuery } from "@/hooks/use-media-query";
import { robotoMono } from "../fonts";

export default function EventCentersPage() {
	const isMobile = useMediaQuery("(max-width: 768px)");
	return (
		<div className="flex items-center justify-start min-h-screen flex-col gap-10 p-5 py-20 md:px-10 bg-slate-50">
			<h1
				className={`${robotoMono.className} font-bold text-2xl md:text-4xl text-black`}
			>
				Event Centers
			</h1>
			{isMobile && <SearchInput placeholder="Search for event center" />}
			<EventCenterList />
		</div>
	);
}

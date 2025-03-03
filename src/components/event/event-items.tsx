export default function EventItems({ items }: { items: string[] }) {
	return (
		<ul className="flex items-start justify-start gap-1 flex-wrap">
			{items.map((event, index) => (
				<li
					key={index}
					className="text-sm px-2 py-1 bg-green-100 rounded-sm "
					aria-label="event-type"
				>
					{event}
				</li>
			))}
		</ul>
	);
}

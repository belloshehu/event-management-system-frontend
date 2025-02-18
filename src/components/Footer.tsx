export default function Footer() {
	return (
		<footer className="p-5 bg-gray-900 text-white">
			<div className="flex items-center justify-between">
				<p>&copy; {new Date().getFullYear()} Event Centers Management System</p>
				<p>
					Created by{" "}
					<a href=" " className="text-green-500">
						Sightek
					</a>
				</p>
			</div>
		</footer>
	);
}

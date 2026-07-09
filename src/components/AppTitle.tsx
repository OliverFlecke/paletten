import colors from "tailwindcss/colors";

const titleColors = [
	colors.rose,
	colors.indigo,
	colors.teal,
	colors.lime,
	colors.purple,
	colors.cyan,
	colors.red,
	colors.amber,
];

const TITLE = "Paletten";

export default function AppTitle() {
	return (
		<h1 className="text-4xl pt-2">
			{TITLE.split("").map((c, i) => (
				<span
					// biome-ignore lint/suspicious/noArrayIndexKey: This is a static string that is being mapped over
					key={i}
					style={{
						color: titleColors[i]["500"],
					}}
				>
					{c}
				</span>
			))}
		</h1>
	);
}

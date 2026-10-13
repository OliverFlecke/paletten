import styles from "./AppTitle.module.css";

const titleColors = [
	"#f43f5e", // rose-500
	"#6366f1", // indigo-500
	"#14b8a6", // teal-500
	"#84cc16", // lime-500
	"#a855f7", // purple-500
	"#06b6d4", // cyan-500
	"#ef4444", // red-500
	"#f59e0b", // amber-500
];

const TITLE = "Paletten";

export default function AppTitle() {
	return (
		<h1 className={styles.title}>
			{TITLE.split("").map((c, i) => (
				<span
					// biome-ignore lint/suspicious/noArrayIndexKey: This is a static string that is being mapped over
					key={i}
					style={{
						color: titleColors[i],
					}}
				>
					{c}
				</span>
			))}
		</h1>
	);
}

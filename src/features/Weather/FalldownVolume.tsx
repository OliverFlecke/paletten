import { CloudRain, CloudSnow } from "lucide-react";
import styles from "./FalldownVolume.module.css";
import type { WeatherFalldownVolume } from "./weatherApi";

interface FalldownVolumeProps extends WeatherFalldownVolume {
	type: "Rain" | "Snow";
}

export default function FalldownVolume(props: FalldownVolumeProps) {
	return (
		<div className={styles.row}>
			<Icon type={props.type} />
			<div className={styles.values}>
				<span className={styles.value}>Last hour: {props["1h"]} mm</span>
				<span className={styles.value}>Last 3 hours: {props["3h"]} mm</span>
			</div>
		</div>
	);
}

function Icon({ type }: { type: "Rain" | "Snow" }) {
	return (
		<>
			{type === "Rain" ? (
				<CloudRain className={styles.icon} size={32} />
			) : (
				<CloudSnow className={styles.icon} size={32} />
			)}
		</>
	);
}

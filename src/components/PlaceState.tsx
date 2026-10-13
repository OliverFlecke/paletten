import type { IPlace } from "../models";
import styles from "./PlaceState.module.css";

interface PlaceStateProps {
	state: IPlace;
	name: string;
}

export default function PlaceState({ state, name }: PlaceStateProps) {
	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>{name}</h2>

			<div className={styles.row}>
				Temperatur: <Value suffix="&#176;C" value={state.temperature} />
			</div>
			<div className={styles.row}>
				Fugtighed: <Value suffix="%" value={state.humidity} />
			</div>
		</div>
	);
}

function Value({ value, suffix }: { value?: unknown; suffix: string }) {
	return <span>{value === undefined ? "ukendt" : `${value} ${suffix}`}</span>;
}

import type { IShelly } from "../models";
import { Button } from "./Button";
import styles from "./MasterButtons.module.css";

interface MasterButtonsProps {
	shellies: IShelly[];
}

export default function MasterButtons({ shellies }: MasterButtonsProps) {
	const allOn = () =>
		shellies.forEach((s) => {
			s.setState("on");
		});
	const allOff = () =>
		shellies.forEach((s) => {
			s.setState("off");
		});

	return (
		<div className={styles.row}>
			<Button className={styles.grow} onClick={allOn}>
				Tænd alt
			</Button>
			<Button className={styles.grow} onClick={allOff}>
				Sluk alt
			</Button>
		</div>
	);
}

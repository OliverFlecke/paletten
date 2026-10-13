import { Power } from "lucide-react";
import { useMemo } from "react";
import { State } from "../models";
import { stateToColor } from "../utils/general";
import { Button } from "./Button";
import styles from "./ShellyComponent.module.css";

interface ShellyCompenentProps {
	name: string;
	state?: State;
	toggle: () => void;
}

const ShellyComponent = ({ name, state, toggle }: ShellyCompenentProps) => {
	const stateString = useMemo(() => stateToString(state), [state]);

	return (
		<Button
			className={styles.button}
			color={stateToColor(state)}
			onClick={toggle}
		>
			<span className={styles.icon}>
				<Power size="20px" />
			</span>
			<span>
				{name} - {stateString}
			</span>
		</Button>
	);
};

function stateToString(state?: State): string {
	switch (state) {
		case State.On:
			return "Tændt";
		case State.Off:
			return "Slukket";
		default:
			return "Ukendt";
	}
}

export default ShellyComponent;

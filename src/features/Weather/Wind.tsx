import { Navigation, Wind as WindIcon } from "lucide-react";
import IconWithText from "../../components/IconWithText";
import styles from "./Wind.module.css";

interface WindProps {
	speed: number;
	deg: number;
	gust: number;
}

const Wind = ({ speed, deg }: WindProps) => (
	<div className={styles.container}>
		<IconWithText icon={WindIcon}>{speed} m/s</IconWithText>
		<Navigation size={24} style={{ transform: `rotate(${deg}deg)` }} />
	</div>
);

export default Wind;

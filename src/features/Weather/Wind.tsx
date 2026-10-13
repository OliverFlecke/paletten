import { Navigation, Wind as WindIcon } from "lucide-react";
import IconWithText from "../../components/IconWithText";

interface WindProps {
	speed: number;
	deg: number;
	gust: number;
}

const Wind = ({ speed, deg }: WindProps) => (
	<div className="flex space-x-2 items-center">
		<IconWithText icon={WindIcon}>{speed} m/s</IconWithText>
		<Navigation style={{ transform: `rotate(${deg}deg)` }} size={24} />
	</div>
);

export default Wind;

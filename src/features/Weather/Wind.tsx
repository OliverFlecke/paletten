import React from 'react';
import {
	WiDirectionUp,
	WiDirectionUpRight,
	WiDirectionRight,
	WiDirectionDownRight,
	WiDirectionDown,
	WiDirectionDownLeft,
	WiDirectionLeft,
	WiDirectionUpLeft,
	WiWindy,
} from 'react-icons/wi';

interface WindProps {
	speed: number;
	deg: number;
	gust: number;
}

const Wind = ({ speed, deg }: WindProps) => (
	<div className="flex space-x-2 items-center">
		<WiWindy size={32} className="inline" />
		<span className="align-middle">Wind {speed} m/s</span>
		<WindDirectionIcon degree={deg} size={24} className="inline" />
	</div>
);

export default Wind;

interface WindDirectionIconProps {
	degree: number;
	size?: number;
	className: string;
}

const WindDirectionIcon = (props: WindDirectionIconProps) => {
	const direction = Math.round(props.degree / 45) % 8;
	switch (direction) {
		case 0:
			return <WiDirectionUp {...props} />;
		case 1:
			return <WiDirectionUpRight {...props} />;
		case 2:
			return <WiDirectionRight {...props} />;
		case 3:
			return <WiDirectionDownRight {...props} />;
		case 4:
			return <WiDirectionDown {...props} />;
		case 5:
			return <WiDirectionDownLeft {...props} />;
		case 6:
			return <WiDirectionLeft {...props} />;
		case 7:
			return <WiDirectionUpLeft {...props} />;

		default:
			return null;
	}
};

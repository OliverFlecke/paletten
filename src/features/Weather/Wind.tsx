import React from 'react';
import { WiWindDeg, WiWindy } from 'react-icons/wi';

interface WindProps {
	speed: number;
	deg: number;
	gust: number;
}

const Wind = ({ speed, deg }: WindProps) => (
	<div className="flex space-x-2 items-center">
		<WiWindy size={32} className="inline" />
		<span className="align-middle">Wind {speed} m/s</span>
		<WiWindDeg transform={`rotate(${deg})`} size={24} />
	</div>
);

export default Wind;

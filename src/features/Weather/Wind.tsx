import React from 'react';
import { WiWindDeg, WiWindy } from 'react-icons/wi';
import IconWithText from '../../components/IconWithText';

interface WindProps {
	speed: number;
	deg: number;
	gust: number;
}

const Wind = ({ speed, deg }: WindProps) => (
	<div className="flex space-x-2 items-center">
		<IconWithText icon={WiWindy}>{speed} m/s</IconWithText>
		<WiWindDeg transform={`rotate(${deg})`} size={24} />
	</div>
);

export default Wind;

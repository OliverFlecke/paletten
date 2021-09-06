import React from 'react';
import { WiRain, WiSnow } from 'react-icons/wi';
import { WeatherFalldownVolume } from './weatherApi';

interface FalldownVolumeProps extends WeatherFalldownVolume {
	type: 'Rain' | 'Snow';
}

const FalldownVolume = (props: FalldownVolumeProps) => (
	<div className="w-full flex justify-between">
		<Icon type={props.type} />
		<div className="flex flex-col items-end">
			<span className="align-middle">Last hour: {props['1h']} mm</span>
			<span className="align-middle">Last 3 hours: {props['3h']} mm</span>
		</div>
	</div>
);

export default FalldownVolume;

const Icon = ({ type }: { type: 'Rain' | 'Snow' }) => (
	<>
		{type === 'Rain' ? (
			<WiRain size={32} className="inline self-center" />
		) : (
			<WiSnow size={32} className="inline self-center" />
		)}
	</>
);

import React from 'react';
import { IPlace } from '../models';

interface PlaceStateProps {
	state: IPlace;
	name: string;
}

const PlaceState = ({ state, name }: PlaceStateProps) => {
	return (
		<div className="w-full max-w-xs">
			<h2 className="text-xl">{name}</h2>

			<div className="flex justify-between w-full">
				Temperatur: <Value value={state.temperature} suffix="&#176;C" />
			</div>
			<div className="flex justify-between w-full">
				Fugtighed: <Value value={state.humidity} suffix="%" />
			</div>
		</div>
	);
};

const Value = ({ value, suffix }: { value?: unknown; suffix: string }) => (
	<span>{value === undefined ? 'ukendt' : `${value} ${suffix}`}</span>
);

export default PlaceState;

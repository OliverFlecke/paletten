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
				Temperatur: <span>{state.temperature} &#176;C</span>
			</div>
			<div className="flex justify-between w-full">
				Fugtighed:
				<span>{state.humidity} %</span>
			</div>
		</div>
	);
};

export default PlaceState;

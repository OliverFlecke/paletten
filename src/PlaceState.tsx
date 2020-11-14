import React from 'react';
import { IPlace } from './models';

interface PlaceStateProps {
	state: IPlace;
	name: string;
}

export const PlaceState = ({ state, name }: PlaceStateProps) => {
	return (
		<div className="w-full max-w-xs">
			<h3 className="">{name}</h3>

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

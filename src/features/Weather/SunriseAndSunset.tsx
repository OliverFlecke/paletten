import { format } from 'date-fns';
import React from 'react';
import { WiSunrise, WiSunset } from 'react-icons/wi';

interface SunriseAndSunsetProps {
	sunrise: Date;
	sunset: Date;
}

const SunriseAndSunset = ({ sunrise, sunset }: SunriseAndSunsetProps) => (
	<div className="w-full flex justify-evenly">
		<span>
			<WiSunrise size={32} />
			{format(sunrise, 'H:mm')}
		</span>
		<span>
			<WiSunset size={32} />
			{format(sunset, 'H:mm')}
		</span>
	</div>
);

export default SunriseAndSunset;

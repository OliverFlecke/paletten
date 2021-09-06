import { format } from 'date-fns';
import React from 'react';
import { WiSunrise, WiSunset } from 'react-icons/wi';

interface SunriceAndSunsetProps {
	sunrise: Date;
	sunset: Date;
}

const SunriseAndSunset = ({ sunrise, sunset }: SunriceAndSunsetProps) => (
	<div className="w-full flex justify-evenly">
		<span>
			<WiSunrise size={32} className="inline" />
			{format(sunrise, 'H:mm')}
		</span>
		<span>
			<WiSunset size={32} className="inline" />
			{format(sunset, 'H:mm')}
		</span>
	</div>
);

export default SunriseAndSunset;

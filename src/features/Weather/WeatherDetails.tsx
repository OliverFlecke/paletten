import React from 'react';
import { WiBarometer, WiFog, WiHumidity } from 'react-icons/wi';

interface WeatherDetailsProps {
	humidity: number;
	pressure: number;
	visibility: number;
}

const WeatherDetails = ({
	humidity,
	pressure,
	visibility,
}: WeatherDetailsProps) => (
	<details>
		<summary>More</summary>
		<div className="grid grid-cols-2 gap-y-2 gap-x-4">
			<span>
				<WiHumidity size={24} className="inline" />
				<span className="align-middle">Humidity</span>
			</span>
			<span>{humidity} %</span>

			<span>
				<WiBarometer size={24} className="inline" />
				<span className="align-middle">Pressure</span>
			</span>
			<span>{pressure} hPa</span>

			<span>
				<WiFog size={24} className="inline" />
				<span className="align-middle">Visibility</span>
			</span>
			<span>{visibility / 1000} km</span>
		</div>
	</details>
);

export default WeatherDetails;

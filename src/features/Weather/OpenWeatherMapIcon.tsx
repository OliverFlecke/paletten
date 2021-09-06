import React from 'react';
import { WeatherStatus } from './weatherApi';

interface OpenWeatherMapIconProps {
	weather: WeatherStatus;
}

const OpenWeatherMapIcon = ({ weather }: OpenWeatherMapIconProps) => (
	<img
		src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
		title={weather.main}
		alt={weather.description}
		className="h-24"
		loading="lazy"
	/>
);

export default OpenWeatherMapIcon;

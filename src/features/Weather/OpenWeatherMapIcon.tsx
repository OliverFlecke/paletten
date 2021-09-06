import React, { memo } from 'react';
import { WeatherStatus } from './weatherApi';

interface OpenWeatherMapIconProps {
	weather: WeatherStatus;
}

const OpenWeatherMapIcon = memo(({ weather }: OpenWeatherMapIconProps) => (
	<img
		src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
		title={weather.main}
		alt={weather.description}
		className="h-24 max-h-full"
		loading="lazy"
	/>
));

OpenWeatherMapIcon.displayName = 'OpenWeatherMapIcon';
export default OpenWeatherMapIcon;

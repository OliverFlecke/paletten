import Image from "next/image";
import { memo } from "react";
import type { WeatherStatus } from "./weatherApi";

interface OpenWeatherMapIconProps {
	weather: WeatherStatus;
}

const OpenWeatherMapIcon = memo(({ weather }: OpenWeatherMapIconProps) => (
	<Image
		src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
		title={weather.main}
		alt={weather.description}
		className="h-24 max-h-full"
		width={100}
		height={100}
	/>
));

OpenWeatherMapIcon.displayName = "OpenWeatherMapIcon";
export default OpenWeatherMapIcon;

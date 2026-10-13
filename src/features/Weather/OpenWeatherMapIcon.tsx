import Image from "next/image";
import { memo } from "react";
import styles from "./OpenWeatherMapIcon.module.css";
import type { WeatherStatus } from "./weatherApi";

interface OpenWeatherMapIconProps {
	weather: WeatherStatus;
}

const OpenWeatherMapIcon = memo(function OpenWeatherMapIcon({
	weather,
}: OpenWeatherMapIconProps) {
	return (
		<Image
			alt={weather.description}
			className={styles.icon}
			height={100}
			src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
			title={weather.main}
			width={100}
		/>
	);
});

OpenWeatherMapIcon.displayName = "OpenWeatherMapIcon";
export default OpenWeatherMapIcon;

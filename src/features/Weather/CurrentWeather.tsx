import { memo } from "react";
import FalldownVolume from "./FalldownVolume";
import OpenWeatherMapIcon from "./OpenWeatherMapIcon";
import SunriseAndSunset from "./SunriseAndSunset";
import WeatherDetails from "./WeatherDetails";
import type { WeatherCurrentResponse } from "./weatherApi";

const CurrentWeather = memo((props: WeatherCurrentResponse) => (
	<>
		<Temperatures
			feels_like={props.feels_like}
			temp={props.temp}
			uvi={props.uvi}
		/>
		<OpenWeatherMapIcon weather={props.weather[0]} />
		<SunriseAndSunset sunrise={props.sunrise} sunset={props.sunset} />
		<WeatherDetails
			humidity={props.humidity}
			pressure={props.pressure}
			visibility={props.visibility}
			wind={{
				speed: props.wind_speed,
				deg: props.wind_deg,
				gust: props.wind_gust,
			}}
		/>
		{props.rain && <FalldownVolume {...props.rain} type={"Rain"} />}
		{props.snow && <FalldownVolume {...props.snow} type={"Snow"} />}
	</>
));
CurrentWeather.displayName = "CurrentWeather";

export default CurrentWeather;

interface TemperatureProps {
	temp: number;
	feels_like: number;
	uvi: number;
}

const Temperatures = ({ temp, feels_like, uvi }: TemperatureProps) => (
	<div className="evenRow">
		<span>Now: {Math.round(temp)} &#176;C</span>
		<span>Feels like: {Math.round(feels_like)} &#176;C</span>
		<span>UV: {uvi}</span>
	</div>
);

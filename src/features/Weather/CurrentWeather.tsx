import React, { memo } from 'react';
import FalldownVolume from './FalldownVolume';
import OpenWeatherMapIcon from './OpenWeatherMapIcon';
import SunriseAndSunset from './SunriseAndSunset';
import { WeatherCurrentResponse } from './weatherApi';
import WeatherDetails from './WeatherDetails';
import Wind from './Wind';

const CurrentWeather = memo((props: WeatherCurrentResponse) => (
	<>
		<Temperatures temp={props.temp} feels_like={props.feels_like} />
		<OpenWeatherMapIcon weather={props.weather[0]} />
		<SunriseAndSunset sunrise={props.sunrise} sunset={props.sunset} />
		<Wind
			speed={props.wind_speed}
			deg={props.wind_deg}
			gust={props.wind_gust}
		/>
		{props.rain && <FalldownVolume {...props.rain} type={'Rain'} />}
		{props.snow && <FalldownVolume {...props.snow} type={'Snow'} />}
		<WeatherDetails
			humidity={props.humidity}
			pressure={props.pressure}
			visibility={props.visibility}
		/>
	</>
));
CurrentWeather.displayName = 'CurrentWeather';

export default CurrentWeather;

interface TemperatureProps {
	temp: number;
	feels_like: number;
}

const Temperatures = ({ temp, feels_like }: TemperatureProps) => (
	<div className="w-full flex justify-evenly">
		<span>Now: {Math.round(temp)} &#176;C</span>
		<span>Feels like: {Math.round(feels_like)} &#176;C</span>
	</div>
);

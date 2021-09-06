import React, { memo, useCallback, useEffect, useState } from 'react';
import { IoIosRefresh } from 'react-icons/io';
import FalldownVolume from './FalldownVolume';
import OpenWeatherMapIcon from './OpenWeatherMapIcon';
import SunriseAndSunset from './SunriseAndSunset';
import {
	CurrentWeatherResponse,
	getCurrentWeather,
	WeatherMain,
} from './weatherApi';
import Wind from './Wind';

const CurrentWeather = memo(() => {
	const [weather, setWeather] = useState<CurrentWeatherResponse | undefined>();

	const refresh = useCallback(() => getCurrentWeather().then(setWeather), [
		setWeather,
	]);

	useEffect(() => {
		refresh();
	}, [refresh]);

	if (!weather) return null;

	return (
		<>
			<Title refresh={refresh} />
			<Temperatures {...weather.main} />
			<OpenWeatherMapIcon weather={weather.weather[0]} />
			<SunriseAndSunset {...weather.sys} />
			<Wind {...weather.wind} />
			{weather.rain && <FalldownVolume {...weather.rain} type={'Rain'} />}
			{weather.snow && <FalldownVolume {...weather.snow} type={'Snow'} />}
		</>
	);
});
CurrentWeather.displayName = 'CurrentWeather';

export default CurrentWeather;

const Title = ({ refresh }: { refresh: () => void }) => (
	<>
		<h2 className="w-full relative text-xl text-yellow-500 pb-2">
			Current weather in Rørvig
			<button className="inline absolute top-1 right-0" onClick={refresh}>
				<IoIosRefresh size={24} />
			</button>
		</h2>
	</>
);

const Temperatures = ({ temp, feels_like }: WeatherMain) => (
	<div className="w-full flex justify-evenly">
		<span>Now: {Math.round(temp)} &#176;C</span>
		<span>Feels like: {Math.round(feels_like)} &#176;C</span>
	</div>
);

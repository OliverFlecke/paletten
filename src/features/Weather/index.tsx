import React, { memo, useCallback, useEffect, useState } from 'react';
import { IoIosRefresh } from 'react-icons/io';
import CurrentWeather from './CurrentWeather';
import { getWeather, WeatherResponse } from './weatherApi';

const Weather = memo(() => {
	const [data, setData] = useState<WeatherResponse | undefined>();
	const refresh = useCallback(() => getWeather().then(setData), [setData]);

	useEffect(() => {
		refresh();
	}, [refresh]);

	return (
		<>
			<h2 className="relative section-header">
				Weather in Rørvig
				<button className="inline absolute top-1 right-0" onClick={refresh}>
					<IoIosRefresh size={24} />
				</button>
			</h2>
			{data?.current && <CurrentWeather {...data.current} />}
		</>
	);
});

Weather.displayName = 'Weather';
export default Weather;

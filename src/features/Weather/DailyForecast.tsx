import { format } from 'date-fns';
import React from 'react';
import OpenWeatherMapIcon from './OpenWeatherMapIcon';
import { WeatherDaily } from './weatherApi';

interface DailyForecastProps {
	data: WeatherDaily[];
}

const DailyForecast = ({ data }: DailyForecastProps) => (
	<>
		{data.map((day) => (
			<div
				key={day.dt.getTime()}
				className="w-full flex justify-between items-center"
			>
				<div className="align-middle">{format(day.dt, 'E, MMM dd')}</div>
				<div className="flex items-center">
					<div className="h-12">
						<OpenWeatherMapIcon weather={day.weather[0]} />
					</div>
					<span>
						{Math.round(day.temp.max)} / {Math.round(day.temp.min)} &#176;C
					</span>
				</div>
			</div>
		))}
	</>
);

export default DailyForecast;

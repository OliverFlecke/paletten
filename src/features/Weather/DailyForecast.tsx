import { format } from "date-fns";
import { useState } from "react";
import {
	ChevronDown,
	ChevronLeft,
	Droplets,
	Gauge,
	Sun,
	Wind,
	CloudRain,
} from "lucide-react";
import DegreeCelsius from "../../components/DegreeCelsius";
import IconWithText from "../../components/IconWithText";
import MoonriseAndMoonset from "./MoonriseAndMoonset";
import OpenWeatherMapIcon from "./OpenWeatherMapIcon";
import SunriseAndSunset from "./SunriseAndSunset";
import type { WeatherDaily } from "./weatherApi";

interface DailyForecastProps {
	data: WeatherDaily[];
}

const DailyForecast = ({ data }: DailyForecastProps) => (
	<>
		{data.map((day) => (
			<Day day={day} key={day.dt.getTime()} />
		))}
	</>
);

export default DailyForecast;

const Day = ({ day }: { day: WeatherDaily }) => {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	return (
		<>
			<button
				type="button"
				className="w-full flex justify-between items-center"
				onClick={() => setIsExpanded((x) => !x)}
			>
				<div className="align-middle">{format(day.dt, "E, MMM dd")}</div>
				<div className="flex items-center">
					<div className="h-12">
						<OpenWeatherMapIcon weather={day.weather[0]} />
					</div>
					<span>
						{Math.round(day.temp.max)} / {Math.round(day.temp.min)}{" "}
						<DegreeCelsius />
					</span>
					<div className="pl-4">
						{isExpanded ? <ChevronDown /> : <ChevronLeft />}
					</div>
				</div>
			</button>
			{isExpanded && <DayDetails day={day} />}
		</>
	);
};

const DayDetails = ({ day }: { day: WeatherDaily }) => (
	<div className="rounded p-2 -m-2 bg-gray-200 dark:bg-gray-800">
		<div className="first-letter:uppercase font-bold">
			{day.weather[0].description}
		</div>
		<div>
			High will be {Math.round(day.temp.max)} <DegreeCelsius />
		</div>
		<div>
			Low will be {Math.round(day.temp.min)} <DegreeCelsius />
		</div>
		<div className="grid grid-cols-3 py-4">
			<IconWithText icon={CloudRain}>{day.pop} %</IconWithText>
			<IconWithText icon={Wind}>{day.wind_speed} m/s</IconWithText>
			<IconWithText icon={Gauge}>{day.pressure} hPa</IconWithText>
			<IconWithText icon={Droplets}>{day.humidity} %</IconWithText>
			<IconWithText icon={Sun}>{day.uvi} UVI</IconWithText>
		</div>
		<SunriseAndSunset sunset={day.sunset} sunrise={day.sunrise} />
		<MoonriseAndMoonset moonset={day.moonset} moonrise={day.moonrise} />
		<TemperatureThroughoutDay day={day} />
	</div>
);

const TemperatureThroughoutDay = ({ day }: { day: WeatherDaily }) => (
	<div className="grid grid-cols-5 grid-rows-3">
		<div className="col-start-2">Morning</div>
		<div>Afternoon</div>
		<div>Evening</div>
		<div>Night</div>
		<div>Temp.</div>
		<div>
			{Math.round(day.temp.morn)} <DegreeCelsius />
		</div>
		<div>
			{Math.round(day.temp.day)} <DegreeCelsius />
		</div>
		<div>
			{Math.round(day.temp.eve)} <DegreeCelsius />
		</div>
		<div>
			{Math.round(day.temp.night)} <DegreeCelsius />
		</div>
		<div>Feels like</div>
		<div>
			{Math.round(day.feels_like.morn)} <DegreeCelsius />
		</div>
		<div>
			{Math.round(day.feels_like.day)} <DegreeCelsius />
		</div>
		<div>
			{Math.round(day.feels_like.eve)} <DegreeCelsius />
		</div>
		<div>
			{Math.round(day.feels_like.night)} <DegreeCelsius />
		</div>
	</div>
);

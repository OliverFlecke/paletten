import { format } from "date-fns";
import {
	ChevronDown,
	ChevronLeft,
	CloudRain,
	Droplets,
	Gauge,
	Sun,
	Wind,
} from "lucide-react";
import { useState } from "react";
import DegreeCelsius from "../../components/DegreeCelsius";
import IconWithText from "../../components/IconWithText";
import styles from "./DailyForecast.module.css";
import MoonriseAndMoonset from "./MoonriseAndMoonset";
import OpenWeatherMapIcon from "./OpenWeatherMapIcon";
import SunriseAndSunset from "./SunriseAndSunset";
import type { WeatherDaily } from "./weatherApi";

interface DailyForecastProps {
	data: WeatherDaily[];
}

export default function DailyForecast({ data }: DailyForecastProps) {
	return (
		<>
			{data.map((day) => (
				<Day day={day} key={day.dt.getTime()} />
			))}
		</>
	);
}

function Day({ day }: { day: WeatherDaily }) {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	return (
		<>
			<button
				className={styles.dayRow}
				onClick={() => setIsExpanded((x) => !x)}
				type="button"
			>
				<div className={styles.date}>{format(day.dt, "E, MMM dd")}</div>
				<div className={styles.summary}>
					<div className={styles.icon}>
						<OpenWeatherMapIcon weather={day.weather[0]} />
					</div>
					<span>
						{Math.round(day.temp.max)} / {Math.round(day.temp.min)}{" "}
						<DegreeCelsius />
					</span>
					<div className={styles.chevron}>
						{isExpanded ? <ChevronDown /> : <ChevronLeft />}
					</div>
				</div>
			</button>
			{isExpanded && <DayDetails day={day} />}
		</>
	);
}

function DayDetails({ day }: { day: WeatherDaily }) {
	return (
		<div className={styles.details}>
			<div className={styles.description}>{day.weather[0].description}</div>
			<div>
				High will be {Math.round(day.temp.max)} <DegreeCelsius />
			</div>
			<div>
				Low will be {Math.round(day.temp.min)} <DegreeCelsius />
			</div>
			<div className={styles.statsGrid}>
				<IconWithText icon={CloudRain}>{day.pop} %</IconWithText>
				<IconWithText icon={Wind}>{day.wind_speed} m/s</IconWithText>
				<IconWithText icon={Gauge}>{day.pressure} hPa</IconWithText>
				<IconWithText icon={Droplets}>{day.humidity} %</IconWithText>
				<IconWithText icon={Sun}>{day.uvi} UVI</IconWithText>
			</div>
			<SunriseAndSunset sunrise={day.sunrise} sunset={day.sunset} />
			<MoonriseAndMoonset moonrise={day.moonrise} moonset={day.moonset} />
			<TemperatureThroughoutDay day={day} />
		</div>
	);
}

function TemperatureThroughoutDay({ day }: { day: WeatherDaily }) {
	return (
		<div className={styles.temperatureGrid}>
			<div className={styles.colStart2}>Morning</div>
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
}

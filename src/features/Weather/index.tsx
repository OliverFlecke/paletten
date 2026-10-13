import { RefreshCw } from "lucide-react";
import { memo, useEffect, useState } from "react";
import CurrentWeather from "./CurrentWeather";
import DailyForecast from "./DailyForecast";
import styles from "./index.module.css";
import { getWeather, type WeatherResponse } from "./weatherApi";

const Weather = memo(function Weather() {
	const [data, setData] = useState<WeatherResponse | undefined>();
	const refresh = () => getWeather().then(setData);

	useEffect(() => {
		getWeather().then(setData);
	}, []);

	return (
		<>
			<Title refresh={refresh} />
			{data?.current && <CurrentWeather {...data.current} />}
			{data?.daily && (
				<>
					<h4 className={`section-header ${styles.dailyHeading}`}>
						Daily forecast
					</h4>
					<DailyForecast data={data.daily} />
				</>
			)}
		</>
	);
});

Weather.displayName = "Weather";
export default Weather;

function Title({ refresh }: { refresh: () => void }) {
	return (
		<h2 className={`section-header ${styles.title}`}>
			Weather in Rørvig
			<button className={styles.refresh} onClick={refresh} type="button">
				<RefreshCw size={24} />
			</button>
		</h2>
	);
}

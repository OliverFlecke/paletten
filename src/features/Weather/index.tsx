import { RefreshCw } from "lucide-react";
import { memo, useCallback, useEffect, useState } from "react";
import CurrentWeather from "./CurrentWeather";
import DailyForecast from "./DailyForecast";
import styles from "./index.module.css";
import { getWeather, type WeatherResponse } from "./weatherApi";

const Weather = memo(() => {
	const [data, setData] = useState<WeatherResponse | undefined>();
	const refresh = useCallback(() => getWeather().then(setData), []);

	useEffect(() => {
		refresh();
	}, [refresh]);

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

const Title = ({ refresh }: { refresh: () => void }) => (
	<h2 className={`section-header ${styles.title}`}>
		Weather in Rørvig
		<button className={styles.refresh} onClick={refresh} type="button">
			<RefreshCw size={24} />
		</button>
	</h2>
);

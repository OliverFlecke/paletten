import { memo, useCallback, useEffect, useState } from "react";
import { IoIosRefresh } from "react-icons/io";
import CurrentWeather from "./CurrentWeather";
import DailyForecast from "./DailyForecast";
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
					<h4 className="section-header pt-4">Daily forecast</h4>
					<DailyForecast data={data.daily} />
				</>
			)}
		</>
	);
});

Weather.displayName = "Weather";
export default Weather;

const Title = ({ refresh }: { refresh: () => void }) => (
	<h2 className="relative section-header">
		Weather in Rørvig
		<button
			className="inline absolute top-0 right-0"
			onClick={refresh}
			type="button"
		>
			<IoIosRefresh size={24} />
		</button>
	</h2>
);

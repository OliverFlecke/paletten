import IconWithText from "components/IconWithText";
import { CloudFog, Droplets, Gauge } from "lucide-react";
import Wind from "./Wind";

interface WeatherDetailsProps {
	humidity: number;
	pressure: number;
	visibility: number;
	wind: { speed: number; deg: number; gust: number };
}

const WeatherDetails = ({
	humidity,
	pressure,
	visibility,
	wind,
}: WeatherDetailsProps) => (
	<div className="grid grid-cols-2 gap-y-2 gap-x-4">
		<Wind {...wind} />
		<IconWithText icon={Droplets}>{humidity} %</IconWithText>
		<IconWithText icon={Gauge}>{pressure} hPa</IconWithText>
		<IconWithText icon={CloudFog}>{visibility / 1000} km</IconWithText>
	</div>
);

export default WeatherDetails;

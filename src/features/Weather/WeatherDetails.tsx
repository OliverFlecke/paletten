import React from 'react';
import { WiBarometer, WiFog, WiHumidity } from 'react-icons/wi';
import IconWithText from 'components/IconWithText';
import Wind from './Wind';

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
		<IconWithText icon={WiHumidity}>{humidity} %</IconWithText>
		<IconWithText icon={WiBarometer}>{pressure} hPa</IconWithText>
		<IconWithText icon={WiFog}>{visibility / 1000} km</IconWithText>
	</div>
);

export default WeatherDetails;

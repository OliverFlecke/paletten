import { AsyncMqttClient } from 'async-mqtt';
import React, { useCallback, useEffect, useState } from 'react';

const DesiredTemperature = ({ client }: { client: AsyncMqttClient }) => {
	const [temperature, setTemperature] = useState<number>(0);
	const onDesiredTemperatureChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.currentTarget.valueAsNumber;
			setTemperature(value);
			client.publish('temperature/set', value.toString(), {
				retain: true,
			});
		},
		[client, setTemperature]
	);

	const [active, setActive] = useState(false);
	const toggleActive = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.currentTarget.checked;
			setActive(value);
			client.publish('temperature/auto', value.toString(), {
				retain: true,
			});
		},
		[client, setActive]
	);

	useEffect(() => {
		client.on('message', (topic, message) => {
			if (topic === 'temperature/set') {
				setTemperature(Number(message.toString()));
			} else if (topic === 'temperature/auto') {
				setActive(message.toString() === 'true');
			}
		});
		client.subscribe('temperature/set');
		client.subscribe('temperature/auto');
	}, [client, setTemperature]);

	return (
		<div className="w-full">
			<div className="space-x-2 h-full">
				<label
					htmlFor="temperature-control"
					className="h-full align-middle text-xl"
				>
					Automatisk temperaturkontrol?
				</label>
				<input
					id="temperature-control"
					type="checkbox"
					onChange={toggleActive}
					checked={active}
					className="w-6 h-6 align-middle"
				/>
			</div>
			<div hidden={!active} className="pt-4">
				<input
					id="temperature-range"
					className="w-11/12 bg-transparent slider-progress"
					style={
						{
							'--min': 0,
							'--max': 25,
							'--value': temperature,
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
						} as any
					}
					type="range"
					min="0"
					max="25"
					value={temperature}
					onChange={onDesiredTemperatureChange}
				/>
				<label htmlFor="temperature-range">
					Ønskede temperature: {temperature} &#176;C
				</label>
			</div>
		</div>
	);
};

export default DesiredTemperature;

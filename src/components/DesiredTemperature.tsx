import { useMqttContext } from "features/MqttContext";
import type React from "react";
import { useCallback, useEffect, useState } from "react";

export default function DesiredTemperature() {
	const { mqttClient } = useMqttContext();
	const [temperature, setTemperature] = useState<number>(0);
	const onDesiredTemperatureChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.currentTarget.valueAsNumber;
			setTemperature(value);
			mqttClient.publish("temperature/set", value.toString(), {
				retain: true,
			});
		},
		[mqttClient],
	);

	const [active, setActive] = useState(false);
	const toggleActive = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.currentTarget.checked;
			setActive(value);
			mqttClient.publish("temperature/auto", value.toString(), {
				retain: true,
			});
		},
		[mqttClient],
	);

	useEffect(() => {
		mqttClient.on("message", (topic, message) => {
			if (topic === "temperature/set") {
				setTemperature(Number(message.toString()));
			} else if (topic === "temperature/auto") {
				setActive(message.toString() === "true");
			}
		});
		mqttClient.subscribe("temperature/set");
		mqttClient.subscribe("temperature/auto");
	}, [mqttClient]);

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
							"--min": 0,
							"--max": 25,
							"--value": temperature,
						} as never
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
}

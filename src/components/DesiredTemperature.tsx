import { useMqttContext } from "features/MqttContext";
import type React from "react";
import { useEffect, useState } from "react";
import styles from "./DesiredTemperature.module.css";

export default function DesiredTemperature() {
	const { mqttClient } = useMqttContext();
	const [temperature, setTemperature] = useState<number>(0);
	const onDesiredTemperatureChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const value = event.currentTarget.valueAsNumber;
		setTemperature(value);
		mqttClient.publish("temperature/set", value.toString(), {
			retain: true,
		});
	};

	const [active, setActive] = useState(false);
	const toggleActive = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.currentTarget.checked;
		setActive(value);
		mqttClient.publish("temperature/auto", value.toString(), {
			retain: true,
		});
	};

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
		<div className={styles.container}>
			<div className={styles.toggleRow}>
				<label className={styles.toggleLabel} htmlFor="temperature-control">
					Automatisk temperaturkontrol?
				</label>
				<input
					checked={active}
					className={styles.checkbox}
					id="temperature-control"
					onChange={toggleActive}
					type="checkbox"
				/>
			</div>
			<div className={styles.rangeContainer} hidden={!active}>
				<input
					className={styles.range}
					id="temperature-range"
					max="25"
					min="0"
					onChange={onDesiredTemperatureChange}
					style={
						{
							"--min": 0,
							"--max": 25,
							"--value": temperature,
						} as never
					}
					type="range"
					value={temperature}
				/>
				<label htmlFor="temperature-range">
					Ønskede temperature: {temperature} &#176;C
				</label>
			</div>
		</div>
	);
}

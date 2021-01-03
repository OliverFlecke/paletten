import React, { useCallback, useEffect, useState } from 'react';
// import { client } from './App';

export const DesiredTemperature = () => {
	const [temperature, setTemperature] = useState<number>(0);
	const onDesiredTemperatureChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.currentTarget.valueAsNumber;
			setTemperature(value);
			// client.publish('temperature/set', value.toString(), {
			// 	retain: true,
			// });
		},
		[setTemperature]
	);

	useEffect(() => {
		console.debug('Running effect');
		// client.subscribe('temperature/set');
		// client.on('message', (topic, message) => {
		// 	if (topic === 'temperature/set') {
		// 		const temp = Number(message.toString());
		// 		setTemperature(temp);

		// 		// client.unsubscribe('temperature/set');
		// 	}
		// });
	}, [setTemperature]);

	return (
		<div className="w-full">
			<input
				className="w-11/12"
				type="range"
				min="0"
				max="25"
				value={temperature}
				onChange={onDesiredTemperatureChange}
			/>
			<div>Ønskede temperature: {temperature} &#176;C</div>
		</div>
	);
};

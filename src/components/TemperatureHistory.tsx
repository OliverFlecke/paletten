import { AsyncMqttClient } from 'async-mqtt';
import React, { useEffect, useState } from 'react';
import { average, groupBy, uniqueHour } from '../utils/general';
import TemperatureChart from './charts/TemperatureChart';

interface TemperatureHistoryProps {
	client: AsyncMqttClient;
}

const TemperatureHistory = ({ client }: TemperatureHistoryProps) => {
	const [inside, setInside] = useState<TemperatureEntry[] | undefined>();
	const [outside, setOutside] = useState<TemperatureEntry[] | undefined>();

	useEffect(() => {
		client.on('message', (topic, message) => {
			if (topic.startsWith('history')) {
				if (topic === 'history/inside') {
					setInside(parseData(message));
				} else if (topic === 'history/outside') {
					setOutside(parseData(message));
				}
			}
		});

		client.subscribe('history/heater/#');
		client.subscribe('history/+');
	}, [client]);

	return (
		<>
			<h2>Temperature inside</h2>
			{inside && <TemperatureChart data={inside} />}
			<h2>Temperature outside</h2>
			{outside && <TemperatureChart data={outside} />}
		</>
	);
};

export default TemperatureHistory;

interface TemperatureEntry {
	time: Date;
	temp: number;
	hum: number;
}

function parseData(message: Buffer): TemperatureEntry[] {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const values = (JSON.parse(message.toString()) as any[]).map((x) => ({
		...x,
		time: new Date(x.time),
	}));

	const group = groupBy(values, (x) => uniqueHour(x.time));

	return Object.keys(group)
		.map((x) => ({
			time: new Date(Date.parse(`${x}:00:00`)),
			temp: average(group[x].map((v) => v.temp)),
			hum: average(group[x].map((v) => v.hum)),
		}))
		.reverse();
}

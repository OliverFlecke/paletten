import { AsyncMqttClient } from 'async-mqtt';
import { parse } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { TemperatureEntry } from '../models';
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
			<h2 className="section-header">Temperature inside</h2>
			{inside && <TemperatureChart data={inside} />}
			<h2 className="section-header">Temperature outside</h2>
			{outside && <TemperatureChart data={outside} />}
		</>
	);
};

export default TemperatureHistory;

function parseData(message: Buffer): TemperatureEntry[] {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const values = (JSON.parse(message.toString()) as any[]).map((x) => ({
		...x,
		time: parse(x.time, 'yyyy-MM-dd HH:mm:ss', 0),
	}));

	const group = groupBy(values, (x) => uniqueHour(x.time));

	return Object.keys(group)
		.map((x) => ({
			time: parse(x, 'yyyy-MM-dd HH', 0),
			temp: average(group[x].map((v) => v.temp)),
			hum: average(group[x].map((v) => v.hum)),
		}))
		.reverse();
}

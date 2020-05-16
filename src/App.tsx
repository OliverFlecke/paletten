import mqtt from 'mqtt';
import React, { useEffect, useState, useCallback } from 'react';
import './App.css';

interface IShelly {
	id: string;
	name: string;
}

// const url = 'mqtt://test.mosquitto.org:8080';
// const url = 'ws://localhost:9001'

const url = 'ws://palletten.northeurope.azurecontainer.io:9001';
const shellies: IShelly[] = [
	{ id: 'C4402D', name: 'Table' },
	{ id: 'C431FB', name: 'Sofa' },
	{ id: '10DB9C', name: 'Bedroom' },
];

const client = mqtt.connect(url);
client.on('connect', () => {
	console.log('connected');

	shellies.forEach((shelly) => {
		client.subscribe(`shellies/shelly1-${shelly.id}/relay/0`, (err) => {});
	});
	client.subscribe('temperature', (err) => {});
	client.subscribe('humidity', (err) => {});
});

function toggleShellyState(shelly: IShelly) {
	client.publish(`shellies/shelly1-${shelly.id}/relay/0/command`, 'toggle');
}

function App() {
	const [temp, setTemp] = useState<number | undefined>();
	const [humidity, setHumidity] = useState<number | undefined>();

	useEffect(() => {
		client.on('message', (topic, message) => {
			if (topic === 'temperature') {
			}
			switch (topic) {
				case 'temperature':
					console.log(message.toString());
					setTemp(Number(message));
					break;
				case 'humidity':
					console.log(message.toString());
					setHumidity(Number(message));
					break;
				default:
					break;
			}
		});
	}, []);

	const toggleAll = useCallback(() => {
		shellies.forEach((x) => toggleShellyState(x));
	}, []);

	return (
		<div className='App'>
			<h1>Palletten</h1>
			<div>Current temperature: {temp ?? 'unknown'} &#176;C</div>
			<div>Current humidity: {humidity}</div>
			<div>
				{shellies.map((shelly) => (
					<Shelly key={shelly.id} shelly={shelly} />
				))}
			</div>
			<button onClick={toggleAll}>Toggle all</button>
		</div>
	);
}

export default App;

const Shelly = ({ shelly }: { shelly: IShelly }) => {
	const toggle = useCallback(() => {
		toggleShellyState(shelly);
	}, [shelly]);

	return <button onClick={toggle}>{shelly.name}</button>;
};

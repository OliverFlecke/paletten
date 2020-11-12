import { connect } from 'mqtt';
import React, { useCallback, useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Button } from './Button';
import { IPlace, IShelly, State } from './models';
import { PlaceState } from './PlaceState';
import { Shelly } from './Shelly';

// const url = 'mqtt://test.mosquitto.org:8080';
// const url = 'ws://localhost:9001'
// const url = 'ws://palletten.northeurope.azurecontainer.io:9001'

const url = 'wss://palletten.northeurope.azurecontainer.io:8083';
const default_shellies: IShelly[] = [
	{ id: 'C4402D', name: 'Spisebord' },
	{ id: 'C431FB', name: 'Sofa' },
	{ id: '10DB9C', name: 'Soveværelse' },
];

const client = connect(url);

export function setShellyState(shelly: IShelly, state = 'toggle') {
	client.publish(`shellies/shelly1-${shelly.id}/relay/0/command`, state);
}

function getPlace(topic: string): string | undefined {
	const match = topic.match(/\/(?<place>\w+)$/);
	return match?.groups ? match?.groups['place'] : undefined;
}

export function stateToColor(state?: State): string {
	switch (state) {
		case State.Off:
			return 'red';
		case State.On:
			return 'green';

		default:
			return 'grey';
	}
}

function usePlace(): [
	IPlace,
	{
		setTemperature: React.Dispatch<React.SetStateAction<number | undefined>>;
		setHumidity: React.Dispatch<React.SetStateAction<number | undefined>>;
	}
] {
	const [temperature, setTemperature] = useState<number | undefined>();
	const [humidity, setHumidity] = useState<number | undefined>();

	return [
		{ temperature, humidity },
		{ setTemperature, setHumidity },
	];
}

function App() {
	const [inside, setters] = usePlace();
	const [outside, outSetters] = usePlace();

	const [shellies, setShellies] = useState<IShelly[]>(default_shellies);
	const ids = shellies.map((x) => x.id);

	useEffect(() => {
		client.on('connect', () => {
			console.log('connected');

			ids.forEach((id) => {
				client.subscribe(`shellies/shelly1-${id}/relay/0`, (err) =>
					console.error(err)
				);
			});
			['inside', 'outside'].forEach((x) => {
				client.subscribe(`temperature/${x}`, (err) => console.error(err));
				client.subscribe(`humidity/${x}`, (err) => console.error(err));
			});
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		client.on('message', (topic, message) => {
			if (topic.startsWith('temperature/')) {
				switch (getPlace(topic)) {
					case 'inside':
						setters?.setTemperature(Number(message));
						break;
					case 'outside':
						outSetters?.setTemperature(Number(message));
						break;
				}
			} else if (topic.startsWith('humidity/')) {
				switch (getPlace(topic)) {
					case 'inside':
						setters.setHumidity(Number(message));
						break;
					case 'outside':
						outSetters.setHumidity(Number(message));
						break;
				}
			}

			if (topic.startsWith('shellies')) {
				const match = topic.match(/-(?<id>\w*)/);
				if (match?.groups) {
					const newState = message.toString() === 'on' ? State.On : State.Off;
					const id = match?.groups['id'];
					setShellies((xs) =>
						xs.map((s) => ({
							...s,
							state: s.id === id ? newState : s.state,
						}))
					);
				}
			}
		});
	}, [outSetters, setters]);

	const allOn = useCallback(() => {
		shellies.forEach((x) => setShellyState(x, 'on'));
	}, [shellies]);
	const allOff = useCallback(() => {
		shellies.forEach((x) => setShellyState(x, 'off'));
	}, [shellies]);

	return (
		<div className="flex flex-col justify-center">
			<h1 className="text-4xl">Palletten</h1>
			<div className="flex justify-between">
				<PlaceState name="Inde" state={inside} />
				<PlaceState name="Ude" state={outside} />
			</div>
			<div className="flex flex-col justify-center align-middle">
				{shellies.map((shelly) => (
					<Shelly key={shelly.id} shelly={shelly} />
				))}
			</div>

			<hr />
			<Button onClick={allOn}>Tænd alt</Button>
			<Button onClick={allOff}>Sluk alt</Button>

			<hr />
			<DesiredTemperature />
		</div>
	);
}

export default App;

const DesiredTemperature = () => {
	const [temperature, setTemperature] = useState<number>(0);
	const onDesiredTemperatureChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.currentTarget.valueAsNumber;
			setTemperature(value);
			client.publish('temperature/set', value.toString(), {
				retain: true,
			});
		},
		[setTemperature]
	);

	useEffect(() => {
		client.subscribe('temperature/set');
		client.on('message', (topic, message) => {
			if (topic === 'temperature/set') {
				const temp = Number(message.toString());
				setTemperature(temp);
				client.unsubscribe('temperature/set');
			}
		});
	}, [setTemperature]);

	return (
		<div>
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

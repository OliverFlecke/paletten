import {
	AsyncMqttClient,
	connectAsync,
	IClientSubscribeOptions,
} from 'async-mqtt';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from './Button';
import { DesiredTemperature } from './DesiredTemperature';
import { IPlace, IShelly, Shelly, State } from './models';
import { PlaceState } from './PlaceState';
import { ShellyComponent } from './ShellyComponent';
import colors from 'tailwindcss/colors';

const url = 'wss://paletten.oliverflecke.me:9001';

const shelly_data = [
	{ id: 'C4402D', name: 'Spisebord' },
	{ id: 'C431FB', name: 'Sofa' },
	{ id: '10DB9C', name: 'Soveværelse' },
];

const titleColors = [
	colors.rose,
	colors.indigo,
	colors.teal,
	colors.lime,
	colors.purple,
	colors.cyan,
	colors.red,
	colors.amber,
];

const mqttOptions: IClientSubscribeOptions = { qos: 1 };

function App() {
	const [client, setClient] = useState<AsyncMqttClient | null | undefined>();

	useEffect(() => {
		async function connect() {
			try {
				const client = await connectAsync(url, undefined, false);
				setClient(client);
			} catch (err) {
				console.warn(err);
				setClient(null);
			}
		}
		connect();
	}, []);

	if (client === undefined) {
		return (
			<h2 className="text-black dark:text-white w-full text-center text-xl">
				Connecting...
			</h2>
		);
	}
	if (client === null) {
		return (
			<h2 className="text-black dark:text-white w-full text-center text-xl">
				Failed to connect. Please contact website developer
			</h2>
		);
	}

	return <Main client={client} />;
}

export default App;

const Main = ({ client }: { client: AsyncMqttClient }) => {
	const [inside, setters] = usePlace();
	const [outside, outSetters] = usePlace();

	const [shellies, setShellies] = useState<IShelly[]>(() =>
		shelly_data.map((s) => new Shelly(s.id, s.name, client))
	);

	useEffect(() => {
		client.on('message', (topic, message) => {
			// console.debug(`Received: ${topic} - ${message}`);
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

		async function setupHandlers(client) {
			subscribe(
				client,
				shellies.map((x) => x.id)
			);
		}

		setupHandlers(client);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [client]);

	const allOn = useCallback(() => shellies.forEach((s) => s.setState('on')), [
		shellies,
	]);
	const allOff = useCallback(() => shellies.forEach((s) => s.setState('off')), [
		shellies,
	]);

	return (
		<div className="flex flex-col justify-center items-center text-center mx-4 text-gray-700 dark:text-gray-300">
			<h1 className="text-4xl pt-2">
				{'Paletten'.split('').map((c, i) => (
					<span
						key={i}
						style={{
							color: titleColors[i]['500'],
						}}
					>
						{c}
					</span>
				))}
			</h1>
			<div className="flex justify-between space-x-6 pb-4 max-w-lg w-full">
				<PlaceState name="Inde" state={inside} />
				<PlaceState name="Ude" state={outside} />
			</div>
			<div className="w-full flex flex-col justify-center align-middle">
				{shellies.map((shelly) => (
					<ShellyComponent key={shelly.id} shelly={shelly} />
				))}
			</div>

			<hr className="w-full my-4" />
			<div className="w-full flex flex-col justify-center align-middle">
				<Button onClick={allOn}>Tænd alt</Button>
				<Button onClick={allOff}>Sluk alt</Button>
			</div>

			<hr className="w-full my-4" />
			<DesiredTemperature client={client} />
		</div>
	);
};

function subscribe(client: AsyncMqttClient, ids: string[]) {
	ids.forEach(
		async (id) =>
			await client.subscribe(`shellies/shelly1-${id}/relay/0`, mqttOptions)
	);
	['inside', 'outside'].forEach(async (x) => {
		await client.subscribe(`temperature/${x}`, mqttOptions);
		await client.subscribe(`humidity/${x}`, mqttOptions);
	});
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

import { connect } from 'mqtt';
import React, { useCallback, useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { IPlace, IShelly, State } from './models';
import { PlaceState } from './PlaceState';
import { Shelly } from './Shelly';
import { Button } from './Button';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    height: 100%;
		width: 100%;
		text-align: center;
  }
`;

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

export function setShellyState(shelly: IShelly, state: string = 'toggle') {
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
				client.subscribe(`shellies/shelly1-${id}/relay/0`, (err) => {});
			});
			['inside', 'outside'].forEach((x) => {
				client.subscribe(`temperature/${x}`, (err) => {});
				client.subscribe(`humidity/${x}`, (err) => {});
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
		<div>
			<GlobalStyle />
			<h1>Palletten</h1>
			<PlaceContainer>
				<PlaceState name='Indendørs' state={inside} />
				<PlaceState name='Udendørs' state={outside} />
			</PlaceContainer>
			<ButtonContainer>
				{shellies.map((shelly) => (
					<Shelly key={shelly.id} shelly={shelly} />
				))}
			</ButtonContainer>

			<hr />
			<Button onClick={allOn}>Tænd alt</Button>
			<Button onClick={allOff}>Sluk alt</Button>
		</div>
	);
}

export default App;

const PlaceContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0 20px;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	vertical-align: middle;
`;

export const IconContainer = styled.span`
	display: inline-flex;
	height: 100%;
	justify-content: center;
	flex-direction: column;
	padding: 0 6px;
`;

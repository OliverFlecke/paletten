import { connect } from 'mqtt';
import React, { useEffect, useState, useCallback } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { IoMdPower } from 'react-icons/io';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    height: 100%;
		width: 100%;
		text-align: center;
  }
`;

enum State {
	On,
	Off,
}

interface IShelly {
	id: string;
	name: string;
	state?: State;
}

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

function setShellyState(shelly: IShelly, state: string = 'toggle') {
	client.publish(`shellies/shelly1-${shelly.id}/relay/0/command`, state);
}

function App() {
	const [temp, setTemp] = useState<number | undefined>();
	const [humidity, setHumidity] = useState<number | undefined>();
	const [shellies, setShellies] = useState<IShelly[]>(default_shellies);
	const ids = shellies.map((x) => x.id);

	useEffect(() => {
		client.on('connect', () => {
			console.log('connected');

			ids.forEach((id) => {
				client.subscribe(`shellies/shelly1-${id}/relay/0`, (err) => {});
			});
			client.subscribe('temperature', (err) => {});
			client.subscribe('humidity', (err) => {});
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		client.on('message', (topic, message) => {
			switch (topic) {
				case 'temperature':
					setTemp(Number(message));
					break;
				case 'humidity':
					setHumidity(Number(message));
					break;
				default:
					break;
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
	}, []);

	const allOn = useCallback(() => {
		shellies.forEach((x) => setShellyState(x, 'on'));
	}, [shellies]);
	const allOff = useCallback(() => {
		shellies.forEach((x) => setShellyState(x, 'off'));
	}, [shellies]);

	return (
		<div className='App'>
			<GlobalStyle />
			<h1>Palletten</h1>
			<div>Nuværende temperatur: {temp ?? 'unknown'} &#176;C</div>
			<div>Nuværende fugtighed: {humidity}%</div>
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

function stateToColor(state?: State): string {
	switch (state) {
		case State.Off:
			return 'red';
		case State.On:
			return 'green';

		default:
			return 'grey';
	}
}

const Shelly = ({ shelly }: { shelly: IShelly }) => {
	const toggle = useCallback(() => {
		setShellyState(shelly);
	}, [shelly]);

	return (
		<Button onClick={toggle} color={stateToColor(shelly.state)}>
			<IconContainer>
				<IoMdPower size='20px' />
			</IconContainer>
			{shelly.name}
		</Button>
	);
};

const Button = styled.button<{ color?: string }>`
	background-color: ${(props) => props.color ?? 'blue'};
	color: white;
	padding: 10px;
	margin: 6px;
	font-size: 1.2em;
	border-radius: 6px;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	vertical-align: middle;
`;

const IconContainer = styled.span`
	display: inline-flex;
	height: 100%;
	justify-content: center;
	flex-direction: column;
	padding: 0 6px;
`;

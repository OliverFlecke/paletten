"use client";

import DesiredTemperature from "components/DesiredTemperature";
import MasterButtons from "components/MasterButtons";
import PlaceState from "components/PlaceState";
import Seperator from "components/Seperator";
import ShellyComponent from "components/ShellyComponent";
import { type IPlace, type IShelly, Shelly, State } from "models";
import type { IClientSubscribeOptions, MqttClient } from "mqtt";
import { useEffect, useState } from "react";
import { MqttProvider, useMqttContext } from "./MqttContext";

const SHELLIES = [
	{ id: "C4402D", name: "Spisebord" },
	{ id: "C431FB", name: "Sofa" },
	{ id: "10DB9C", name: "Soveværelse" },
];

export default function Main() {
	return (
		<MqttProvider>
			<Content />
		</MqttProvider>
	);
}

function Content() {
	const { mqttClient } = useMqttContext();
	const [inside, setters] = usePlace();
	const [outside, outSetters] = usePlace();

	const [shellies, setShellies] = useState<IShelly[]>(() =>
		SHELLIES.map((s) => new Shelly(s.id, s.name, mqttClient)),
	);

	useEffect(() => {
		mqttClient.on("message", (topic, message) => {
			if (topic.startsWith("temperature/")) {
				switch (getPlace(topic)) {
					case "inside":
						setters?.setTemperature(Number(message));
						break;
					case "outside":
						outSetters?.setTemperature(Number(message));
						break;
				}
			} else if (topic.startsWith("humidity/")) {
				switch (getPlace(topic)) {
					case "inside":
						setters.setHumidity(Number(message));
						break;
					case "outside":
						outSetters.setHumidity(Number(message));
						break;
				}
			}

			if (topic.startsWith("shellies")) {
				const match = topic.match(/-(?<id>\w*)/);
				if (match?.groups) {
					const newState = message.toString() === "on" ? State.On : State.Off;
					const id = match?.groups.id;
					setShellies((xs) =>
						xs.map((s) => ({
							...s,
							state: s.id === id ? newState : s.state,
						})),
					);
				}
			}
		});

		async function setupHandlers(client: MqttClient) {
			subscribe(
				client,
				shellies.map((x) => x.id),
			);
		}

		setupHandlers(mqttClient);
	}, [
		mqttClient,
		outSetters?.setTemperature,
		shellies.map,
		setters?.setTemperature,
		setters.setHumidity,
		outSetters.setHumidity,
	]);

	return (
		<>
			<section className="flex justify-between space-x-6 pb-4 max-w-lg w-full">
				<PlaceState name="Inde" state={inside} />
				<PlaceState name="Ude" state={outside} />
			</section>
			<section className="w-full flex flex-col justify-center align-middle">
				{shellies.map((shelly) => (
					<ShellyComponent
						key={shelly.id}
						name={shelly.name}
						state={shelly.state}
						toggle={shelly.toggle}
					/>
				))}
			</section>

			<Seperator />
			<MasterButtons shellies={shellies} />

			<Seperator />
			<DesiredTemperature />
		</>
	);
}

const mqttOptions: IClientSubscribeOptions = { qos: 1 };

function subscribe(client: MqttClient, ids: string[]) {
	ids.forEach(async (id) => {
		await client.subscribeAsync(`shellies/shelly1-${id}/relay/0`, mqttOptions);
	});
	["inside", "outside"].forEach(async (x) => {
		await client.subscribeAsync(`temperature/${x}`, mqttOptions);
		await client.subscribeAsync(`humidity/${x}`, mqttOptions);
	});
}

function getPlace(topic: string): string | undefined {
	const match = topic.match(/\/(?<place>\w+)$/);
	return match?.groups ? match?.groups.place : undefined;
}

function usePlace(): [
	IPlace,
	{
		setTemperature: React.Dispatch<React.SetStateAction<number | undefined>>;
		setHumidity: React.Dispatch<React.SetStateAction<number | undefined>>;
	},
] {
	const [temperature, setTemperature] = useState<number | undefined>();
	const [humidity, setHumidity] = useState<number | undefined>();

	return [
		{ temperature, humidity },
		{ setTemperature, setHumidity },
	];
}

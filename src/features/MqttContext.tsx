import mqtt, { type MqttClient } from "mqtt";
import {
	createContext,
	type PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";

const MQTT_HOST =
	process.env.NEXT_PUBLIC_MQTT_URL || "wss://mqtt.oliverflecke.me:9001";

interface ContextState {
	mqttClient: MqttClient;
}

export function useMqttContext() {
	return useContext(MqttContext);
}

export function MqttProvider({ children }: PropsWithChildren) {
	const [mqttClient, setClient] = useState<MqttClient | null | undefined>();

	useEffect(() => {
		async function connect() {
			try {
				const client = await mqtt.connectAsync(MQTT_HOST, {}, false);
				console.log("connected");
				setClient(client);
			} catch (err) {
				console.warn(err);
			}
		}
		connect();
	}, []);

	if (mqttClient === undefined) {
		return (
			<h2 className="text-black dark:text-white w-full text-center text-xl">
				Connecting...
			</h2>
		);
	}
	if (mqttClient === null) {
		return (
			<h2 className="text-black dark:text-white w-full text-center text-xl">
				Failed to connect. Please contact developer
			</h2>
		);
	}

	return (
		<MqttContext.Provider value={{ mqttClient }}>
			{children}
		</MqttContext.Provider>
	);
}

// biome-ignore lint/style/noNonNullAssertion: creating default value here. Will never be used directly
const MqttContext = createContext<ContextState>(null!);

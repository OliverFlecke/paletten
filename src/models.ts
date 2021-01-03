import { AsyncMqttClient } from 'async-mqtt';

export enum State {
	On,
	Off,
}

export interface IShelly {
	id: string;
	name: string;
	state?: State;
	toggle: () => void;
	setState: (state: string) => void;
}

export class Shelly implements IShelly {
	private client: AsyncMqttClient;
	id: string;
	name: string;
	state?: State | undefined;

	constructor(id: string, name: string, client: AsyncMqttClient) {
		this.id = id;
		this.name = name;
		this.client = client;
	}

	toggle = () => this.client.publish(this.commandPath(), 'toggle');
	setState = (state: string) => this.client.publish(this.commandPath(), state);
	commandPath = () => `shellies/shelly1-${this.id}/relay/0/command`;
}

export interface IPlace {
	temperature?: number;
	humidity?: number;
}

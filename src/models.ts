export enum State {
	On,
	Off,
}

export interface IShelly {
	id: string;
	name: string;
	state?: State;
}

export interface IPlace {
	temperature?: number;
	humidity?: number;
}

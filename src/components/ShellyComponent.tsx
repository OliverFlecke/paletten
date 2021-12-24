import React, { useMemo } from 'react';
import { IoMdPower } from 'react-icons/io';
import { stateToColor } from '../App';
import { State } from '../models';
import { Button } from './Button';

interface ShellyCompenentProps {
	name: string;
	state?: State;
	toggle: () => void;
}

const ShellyComponent = ({ name, state, toggle }: ShellyCompenentProps) => {
	const stateString = useMemo(() => stateToString(state), [state]);

	return (
		<Button className="space-x-4" onClick={toggle} color={stateToColor(state)}>
			<span className="inline-flex flex-col h-full justify-center align-middle">
				<IoMdPower size="20px" />
			</span>
			<span>
				{name} - {stateString}
			</span>
		</Button>
	);
};

function stateToString(state?: State): string {
	switch (state) {
		case State.On:
			return 'Tændt';
		case State.Off:
			return 'Slukket';
		default:
			return 'Ukendt';
	}
}

export default ShellyComponent;

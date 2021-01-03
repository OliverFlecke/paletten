import React, { useCallback } from 'react';
import { IoMdPower } from 'react-icons/io';
import { setShellyState, stateToColor } from './App';
import { Button } from './Button';
import { IShelly, State } from './models';

export const Shelly = ({ shelly }: { shelly: IShelly }) => {
	const toggle = useCallback(() => {
		setShellyState(shelly);
	}, [shelly]);

	return (
		<Button
			className="space-x-4"
			onClick={toggle}
			color={stateToColor(shelly.state)}
		>
			<span className="inline-flex flex-col h-full justify-center align-middle">
				<IoMdPower size="20px" />
			</span>
			<span>
				{shelly.name} - {shelly.state === State.On ? 'Tændt' : 'Slukket'}
			</span>
		</Button>
	);
};

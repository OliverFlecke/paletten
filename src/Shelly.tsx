import React, { useCallback } from 'react';
import { IoMdPower } from 'react-icons/io';
import { setShellyState, stateToColor } from './App';
import { Button } from './Button';
import { IShelly } from './models';

export const Shelly = ({ shelly }: { shelly: IShelly }) => {
	const toggle = useCallback(() => {
		setShellyState(shelly);
	}, [shelly]);

	return (
		<Button onClick={toggle} color={stateToColor(shelly.state)}>
			<span className="inline-flex flex-col h-full justify-center px-2">
				<IoMdPower size="20px" />
			</span>
			<span>{shelly.name}</span>
		</Button>
	);
};

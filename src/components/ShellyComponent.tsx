import React from 'react';
import { IoMdPower } from 'react-icons/io';
import { stateToColor } from '../App';
import { Button } from './Button';
import { IShelly, State } from '../models';

const ShellyComponent = ({ shelly }: { shelly: IShelly }) => {
	return (
		<Button
			className="space-x-4"
			onClick={shelly.toggle}
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

export default ShellyComponent;

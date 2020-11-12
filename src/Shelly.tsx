import React, { useCallback } from 'react';
import { IoMdPower } from 'react-icons/io';
import { IconContainer, setShellyState, stateToColor } from './App';
import { Button } from './Button';
import { IShelly } from './models';

export const Shelly = ({ shelly }: { shelly: IShelly }) => {
	const toggle = useCallback(() => {
		setShellyState(shelly);
	}, [shelly]);

	return (
		<Button onClick={toggle} color={stateToColor(shelly.state)}>
			<IconContainer>
				<IoMdPower size="20px" />
			</IconContainer>
			{shelly.name}
		</Button>
	);
};

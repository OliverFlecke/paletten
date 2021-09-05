import React, { useCallback } from 'react';
import { Button } from './Button';
import { IShelly } from '../models';

interface MasterButtonsProps {
	shellies: IShelly[];
}

const MasterButtons = ({ shellies }: MasterButtonsProps) => {
	const allOn = useCallback(() => shellies.forEach((s) => s.setState('on')), [
		shellies,
	]);
	const allOff = useCallback(() => shellies.forEach((s) => s.setState('off')), [
		shellies,
	]);

	return (
		<div className="w-full flex flex-row">
			<Button onClick={allOn} className="flex-grow">
				Tænd alt
			</Button>
			<Button onClick={allOff} className="flex-grow">
				Sluk alt
			</Button>
		</div>
	);
};

export default MasterButtons;

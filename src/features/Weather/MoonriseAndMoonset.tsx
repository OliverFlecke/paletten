import { format } from 'date-fns';
import React from 'react';
import { WiMoonrise, WiMoonset } from 'react-icons/wi';

interface MoonriseAndMoonsetProps {
	moonrise: Date;
	moonset: Date;
}

const MoonriseAndMoonset = ({ moonrise, moonset }: MoonriseAndMoonsetProps) => (
	<div className="w-full flex justify-evenly">
		<span>
			<WiMoonrise size={32} />
			{format(moonrise, 'H:mm')}
		</span>
		<span>
			<WiMoonset size={32} />
			{format(moonset, 'H:mm')}
		</span>
	</div>
);

export default MoonriseAndMoonset;

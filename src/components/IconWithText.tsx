import React, { ReactNode } from 'react';
import { IconType } from 'react-icons';

interface IconWithTextProps {
	icon: IconType;
	children: ReactNode;
}

const IconWithText = ({ icon, children }: IconWithTextProps) => (
	<div>
		{icon({ size: 24 })}
		<span className="pl-1 align-middle">{children}</span>
	</div>
);

export default IconWithText;

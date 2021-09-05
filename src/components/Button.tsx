import React from 'react';

interface ButtonProps {
	children: JSX.Element[] | string;
	onClick: () => void;
	color?: string;
	className?: string;
}

export const Button = ({
	color,
	children,
	className,
	onClick,
}: ButtonProps) => (
	<button
		onClick={onClick}
		className={`text-white p-2 m-2 text-xl rounded ${mapColor(
			color ?? 'blue'
		)} ${className}`}
	>
		{children}
	</button>
);

function mapColor(color: string) {
	switch (color) {
		case 'blue':
			return 'bg-blue-900';
		case 'red':
			return 'bg-red-900';
		case 'green':
			return 'bg-green-900';

		default:
			return 'bg-gray-700';
	}
}

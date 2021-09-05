import React from 'react';
import colors from 'tailwindcss/colors';

const titleColors = [
	colors.rose,
	colors.indigo,
	colors.teal,
	colors.lime,
	colors.purple,
	colors.cyan,
	colors.red,
	colors.amber,
];

const AppTitle: React.FC = () => (
	<h1 className="text-4xl pt-2">
		{'Paletten'.split('').map((c, i) => (
			<span
				key={i}
				style={{
					color: titleColors[i]['500'],
				}}
			>
				{c}
			</span>
		))}
	</h1>
);

export default AppTitle;

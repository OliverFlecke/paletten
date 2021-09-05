import { AxisBottom, AxisLeft } from '@visx/axis';
import { Group } from '@visx/group';
import { ParentSize } from '@visx/responsive';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Bar } from '@visx/shape';
import React from 'react';
import colors from 'tailwindcss/colors';

const axisColor = colors.purple['500'];

interface BarGraphProps {
	data: any[];
}

const BarGraph = ({ data }: BarGraphProps) => {
	return (
		<ParentSize>
			{({ width }) => {
				const height = 150;
				const margin = { top: 20, bottom: 20, left: 30, right: 20 };

				const xMax = width - margin.left - margin.right;
				const yMax = height - margin.top - margin.bottom;

				const x = (d) => d.time;
				const y = (d) => d.temp;

				const xScale = scaleBand({
					range: [margin.left, xMax],
					round: true,
					domain: data.map(x),
					padding: 0.4,
				});
				const yScale = scaleLinear({
					range: [yMax, 0],
					round: true,
					domain: [0, Math.max(...data.map(y))],
				});

				// Compose together the scale and accessor functions to get point functions
				const compose = (scale, accessor) => (data) => scale(accessor(data));
				const xPoint = compose(xScale, x);
				const yPoint = compose(yScale, y);
				return (
					<svg width={width} height={height}>
						{data.map((d, i) => {
							const barHeight = yMax - yPoint(d);
							return (
								<Group key={`bar-${i}`}>
									<Bar
										x={xPoint(d)}
										y={yMax - barHeight}
										height={barHeight}
										width={xScale.bandwidth()}
										fill={colors.red['700']}
									/>
								</Group>
							);
						})}
						<AxisBottom
							top={yMax + 10}
							scale={xScale}
							tickFormat={(d: Date) => `${d.getHours()}`}
							stroke={axisColor}
							tickStroke={axisColor}
							tickLabelProps={() => ({
								fill: axisColor,
								fontSize: 11,
								textAnchor: 'middle',
							})}
						/>
						<AxisLeft
							scale={yScale}
							left={margin.left + 10}
							numTicks={5}
							tickFormat={(t) => `${t} C`}
							stroke={axisColor}
							tickStroke={axisColor}
							tickLabelProps={() => ({
								fill: axisColor,
								fontSize: 11,
								textAnchor: 'end',
							})}
						/>
					</svg>
				);
			}}
		</ParentSize>
	);
};

export default BarGraph;

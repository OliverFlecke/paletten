import { AxisBottom, AxisLeft } from '@visx/axis';
import { Group } from '@visx/group';
import { ParentSize } from '@visx/responsive';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Bar } from '@visx/shape';
import { getHours } from 'date-fns';
import React from 'react';
import colors from 'tailwindcss/colors';
import { TemperatureEntry } from '../../models';

const axisColor = colors.purple['500'];

interface BarGraphProps {
	data: TemperatureEntry[];
}

const BarGraph = ({ data }: BarGraphProps) => {
	return (
		<ParentSize>
			{({ width }) => {
				const height = 150;
				const margin = { top: 20, bottom: 20, left: 30, right: 0 };

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
					domain: [Math.min(...data.map(y)) - 2, Math.max(...data.map(y))],
				});

				const compose = (scale, accessor) => (data) => scale(accessor(data));
				const xPoint = compose(xScale, x);
				const yPoint = compose(yScale, y);

				const hourOffset = new Date().getTimezoneOffset() / 60;

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
							tickFormat={(d: Date) => `${getHours(d) - hourOffset}`}
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

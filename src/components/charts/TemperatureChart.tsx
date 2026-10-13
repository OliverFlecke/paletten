import { AxisBottom, AxisLeft } from "@visx/axis";
import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import { getHours } from "date-fns";
import type { TemperatureEntry } from "../../models";

const axisColor = "#a855f7"; // purple-500
const barColor = "#b91c1c"; // red-700

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
					<svg height={height} width={width}>
						<title>Weather history in Rørvig</title>
						{data.map((d) => {
							const barHeight = yMax - yPoint(d);
							return (
								<Group key={`bar-${d.time}`}>
									<Bar
										fill={barColor}
										height={barHeight}
										width={xScale.bandwidth()}
										x={xPoint(d)}
										y={yMax - barHeight}
									/>
								</Group>
							);
						})}
						<AxisBottom
							scale={xScale}
							stroke={axisColor}
							tickFormat={(d: Date) => `${getHours(d) - hourOffset}`}
							tickLabelProps={() => ({
								fill: axisColor,
								fontSize: 11,
								textAnchor: "middle",
							})}
							tickStroke={axisColor}
							top={yMax + 10}
						/>
						<AxisLeft
							left={margin.left + 10}
							numTicks={5}
							scale={yScale}
							stroke={axisColor}
							tickFormat={(t) => `${t} C`}
							tickLabelProps={() => ({
								fill: axisColor,
								fontSize: 11,
								textAnchor: "end",
							})}
							tickStroke={axisColor}
						/>
					</svg>
				);
			}}
		</ParentSize>
	);
};

export default BarGraph;

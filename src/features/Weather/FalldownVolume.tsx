import { CloudRain, CloudSnow } from "lucide-react";
import type { WeatherFalldownVolume } from "./weatherApi";

interface FalldownVolumeProps extends WeatherFalldownVolume {
	type: "Rain" | "Snow";
}

const FalldownVolume = (props: FalldownVolumeProps) => (
	<div className="w-full flex justify-between">
		<Icon type={props.type} />
		<div className="flex flex-col items-end">
			<span className="align-middle">Last hour: {props["1h"]} mm</span>
			<span className="align-middle">Last 3 hours: {props["3h"]} mm</span>
		</div>
	</div>
);

export default FalldownVolume;

const Icon = ({ type }: { type: "Rain" | "Snow" }) => (
	<>
		{type === "Rain" ? (
			<CloudRain size={32} className="inline self-center" />
		) : (
			<CloudSnow size={32} className="inline self-center" />
		)}
	</>
);

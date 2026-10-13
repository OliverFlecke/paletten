import { format } from "date-fns";
import { Sunrise, Sunset } from "lucide-react";

interface SunriseAndSunsetProps {
	sunrise: Date;
	sunset: Date;
}

const SunriseAndSunset = ({ sunrise, sunset }: SunriseAndSunsetProps) => (
	<div className="w-full flex justify-evenly">
		<span>
			<Sunrise size={32} />
			{format(sunrise, "H:mm")}
		</span>
		<span>
			<Sunset size={32} />
			{format(sunset, "H:mm")}
		</span>
	</div>
);

export default SunriseAndSunset;

import { format } from "date-fns";
import { Sunrise, Sunset } from "lucide-react";

interface SunriseAndSunsetProps {
	sunrise: Date;
	sunset: Date;
}

export default function SunriseAndSunset({
	sunrise,
	sunset,
}: SunriseAndSunsetProps) {
	return (
		<div className="evenRow">
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
}

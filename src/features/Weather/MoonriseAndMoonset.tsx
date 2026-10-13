import { format } from "date-fns";
import { Moon, MoonStar } from "lucide-react";

interface MoonriseAndMoonsetProps {
	moonrise: Date;
	moonset: Date;
}

const MoonriseAndMoonset = ({ moonrise, moonset }: MoonriseAndMoonsetProps) => (
	<div className="evenRow">
		<span>
			<Moon size={32} />
			{format(moonrise, "H:mm")}
		</span>
		<span>
			<MoonStar size={32} />
			{format(moonset, "H:mm")}
		</span>
	</div>
);

export default MoonriseAndMoonset;

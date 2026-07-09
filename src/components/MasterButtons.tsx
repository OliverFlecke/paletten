import type { IShelly } from "../models";
import { Button } from "./Button";

interface MasterButtonsProps {
	shellies: IShelly[];
}

export default function MasterButtons({ shellies }: MasterButtonsProps) {
	const allOn = () =>
		shellies.forEach((s) => {
			s.setState("on");
		});
	const allOff = () =>
		shellies.forEach((s) => {
			s.setState("off");
		});

	return (
		<div className="w-full flex flex-row">
			<Button onClick={allOn} className="flex-grow">
				Tænd alt
			</Button>
			<Button onClick={allOff} className="flex-grow">
				Sluk alt
			</Button>
		</div>
	);
}

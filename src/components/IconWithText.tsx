import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface IconWithTextProps {
	icon: LucideIcon;
	children: ReactNode;
}

const IconWithText = ({ icon: Icon, children }: IconWithTextProps) => (
	<div>
		<Icon size={24} />
		<span className="pl-1 align-middle">{children}</span>
	</div>
);

export default IconWithText;

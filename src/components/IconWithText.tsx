import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import styles from "./IconWithText.module.css";

interface IconWithTextProps {
	icon: LucideIcon;
	children: ReactNode;
}

export default function IconWithText({
	icon: Icon,
	children,
}: IconWithTextProps) {
	return (
		<div>
			<Icon size={24} />
			<span className={styles.text}>{children}</span>
		</div>
	);
}

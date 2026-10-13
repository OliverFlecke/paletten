import type { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
	children: ReactNode[] | string;
	onClick: () => void;
	color?: string;
	className?: string;
}

export const Button = ({
	color,
	children,
	className,
	onClick,
}: ButtonProps) => (
	<button
		className={`${styles.button} ${mapColor(color ?? "blue")} ${className ?? ""}`}
		onClick={onClick}
		type="button"
	>
		{children}
	</button>
);

function mapColor(color: string) {
	switch (color) {
		case "blue":
			return styles.blue;
		case "red":
			return styles.red;
		case "green":
			return styles.green;

		default:
			return styles.gray;
	}
}

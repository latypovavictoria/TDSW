import styles from "./index.module.css";

export interface EBoxProps {
	children?: JSX.Element[] | JSX.Element | string;
	header?: JSX.Element[] | JSX.Element | string;

	className?: string;
	id?: string;

	notched?: boolean;
	active?: boolean;
	borderless?: boolean;
	noCorners?: boolean;
	twoCorners?: boolean;
	bgColor?: string;

	onClick?: () => void;
}
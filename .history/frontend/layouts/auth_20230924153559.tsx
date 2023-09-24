import { motion, Variants } from "framer-motion";

interface AuthLayoutProps {
	children: JSX.Element[] | JSX.Element;
	noNavbar?: boolean;
}

const variants: Variants = {
	hidden: { opacity: 0 },
	enter: { opacity: 1 },
	exit: { opacity: 0 },
};

const AuthLayout = ({children, n}) => {

}


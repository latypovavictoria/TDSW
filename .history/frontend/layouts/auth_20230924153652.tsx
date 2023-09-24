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

const AuthLayout = ({children, noNavbar = false}: AuthLayoutProps) => (
	<motion.main
		initial="hidden"
		animate="enter"
		exit="exit"
		variants={variants}
		transition={{ type: "linear", duration: 0.5, delay: 0.25 }}
	>
		<div className="flex items-center justify-around h-screen">{children}</div>
	</motion.main>
)

export d


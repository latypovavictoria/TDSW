import { motion, Variants } from "framer-motion";
import MainNavBar from "../blocks/main_nav_bar";
import SideBar from "../blocks/side_bar";
import OsBarContainer from "../components/UI/OsBar";

interface DefaultLayoutProps {
  children: JSX.Element[] | JSX.Element;
  noNavbar?: boolean;
}

export const variants: Variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <motion.main
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: "linear", duration: 0.5, delay: 0.25 }}
        className="relative min-h-screen p-3"
      >
        <div className="grid grid-cols-4 gap-4">
          <div className="hidden sm:flex">
            <SideBar />
          </div>
          <div className="z-50 col-span-4 flex sm:col-span-3">
            <MainNavBar />
          </div>
          <div className="col-span-4">{children}</div>
        </div>
        <div className="fixed bottom-0 z-20 flex w-full flex-col items-center">
          <OsBarContainer />
        </div>
      </motion.main>
    </>
  );
};

export default DefaultLayout;

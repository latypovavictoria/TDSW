import { useAppSelector } from "redux/hooks";

import styles from "./HumanModel.module.css";

import HCombined from "./svgs/HCombined";
import SvgHOutline from "./svgs/HOutline";
import SvgIntesties from "./svgs/Intesties";
import SvgLiver from "./svgs/Liver";
import SvgSkeleton from "./svgs/Skeleton";
import SvgStomach from "./svgs/Stomach";
import SvgCirculatorySystem from "./svgs/SvgCirculatorySystem";

const HumanModel = () => {
  const patId = useAppSelector((state) => state.patients.currentPatientId);

  if (patId == -1) {
    return <></>;
  }

  return (
    <div className="relative -mt-[3vh] flex flex-grow justify-center justify-self-center">
      <SvgHOutline className={styles.item} />
      <SvgHOutline className="invisible max-h-[60vh]" />
      <HCombined className={`${styles.item} z-[5]`} />
      <SvgIntesties className={`${styles.item} ${styles.inactive} z-[3]`} />
      <SvgCirculatorySystem
        className={`${styles.item} ${
          process.env.NEXT_PUBLIC_VEINS_ACTIVE === "false"
            ? styles.inactive
            : ""
        }`}
      />
      <SvgLiver className={`${styles.item} ${styles.inactive} z-[3]`} />
      <SvgSkeleton
        className={`${styles.item} ${styles.inactive} z-[1] opacity-30`}
      />
      <SvgStomach className={`${styles.item} ${styles.inactive} z-[2]`} />
    </div>
  );
};

export default HumanModel;

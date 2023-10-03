import { Icon } from "@iconify/react";
import { useTranslation } from "next-i18next";
import Link from "next/link";

import EBox from "@components/UI/EBox";

export interface OsBarProps {
  open: boolean;
  onLeave: () => void;
}

const paths = [
  {
    path: "/",
    name: "paths.avatar",
    icon: "iconoir:favourite-window",
  },
  {
    path: "/admBoard",
    name: "paths.admBoard",
    icon: "iconoir:search-window",
  },
];

export default function OsBar({ onLeave, open }: OsBarProps) {
  const { t } = useTranslation("common");

  return (
    <div
      className={`relative bottom-[200%] z-20 flex flex-col items-center ${
        open ? "opacity-100" : "opacity-0"
      }`}
      onMouseLeave={onLeave}
    >
      <EBox className="z-20 m-2 flex flex-row bg-bg-primary p-2">
        {paths.map((p) => (
          <Link href={p.path} key={p.name}>
            <div className="relative [&>*]:hover:opacity-100">
              <Icon icon={p.icon} fontSize="1.875rem" className="m-3"></Icon>
              <span className="pointer-events-none absolute bottom-full left-1/2 mx-auto w-max -translate-x-1/2 p-3 text-lg opacity-0 transition-opacity">
                {t(p.name)}
              </span>
            </div>
          </Link>
        ))}
      </EBox>
    </div>
  );
}

import { useTranslation } from "next-i18next";
import { ChangeEvent } from "react";

import { useOrganizations } from "../../hooks/useOrganizations";

export interface HeaderProps {
  activeTown: number | undefined;
  setTown: (_: ChangeEvent<HTMLSelectElement>) => void;
}

function Header({ activeTown, setTown }: HeaderProps) {
  const { t } = useTranslation("admin");

  const organizations = useOrganizations();

  return (
    <div className="flex flex-row items-center gap-2 p-2">
      <span>{t("side.title")}</span>
      <select onChange={setTown} className="max-w-xs" value={activeTown}>
        {organizations.map((org, index) => (
          <option key={index} value={org.id}>
            {org.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Header;

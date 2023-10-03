import { useTranslation } from "next-i18next";

export interface ProgressProps {
  value?: number | null;
  max?: number | null;
}

function Progress({ value, max }: ProgressProps) {
  const { t } = useTranslation("patients");

  return value ? (
    <progress
      className="my-auto ml-auto"
      value={Math.round(value)}
      max={max ?? 10000}
    >
      {Math.round(value)}
    </progress>
  ) : (
    <span className="ml-auto">{t("noData")}</span>
  );
}

export default Progress;

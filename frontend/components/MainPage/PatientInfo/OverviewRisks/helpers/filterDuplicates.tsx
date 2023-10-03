export function filterDuplicates(
  risks: {
    risk: string;
    datetime_created: string;
  }[]
) {
  return risks.filter(
    (risk, index, self) => index === self.findIndex((t) => t.risk === risk.risk)
  );
}

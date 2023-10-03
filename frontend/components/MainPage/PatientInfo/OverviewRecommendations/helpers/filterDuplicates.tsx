export function filterDuplicates(
  recommendations: {
    recommendation: string;
    datetime_created: string;
  }[]
) {
  return recommendations.filter(
    (reccomendation, index, self) =>
      index ===
      self.findIndex((t) => t.recommendation === reccomendation.recommendation)
  );
}

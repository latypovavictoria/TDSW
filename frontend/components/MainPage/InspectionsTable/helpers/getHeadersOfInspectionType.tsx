export const getHeadersOfInspectionType = (type: string) => {
  switch (type) {
    case "pre-shift":
    case "post-shift":
      return ["pressure.default", "temperature", "intoxication", "pulse"];
    case "ecg":
    default:
      return;
  }
};

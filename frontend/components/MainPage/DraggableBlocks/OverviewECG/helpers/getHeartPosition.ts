export function getHeartPosition() {
  return () => {
    const heart = document?.getElementById("heart_svg");
    if (!heart) return undefined;

    const rect = heart.getBoundingClientRect();
    return {
      y: rect.top + rect.height / 2,
      x: rect.left + rect.width / 2,
    };
  };
}

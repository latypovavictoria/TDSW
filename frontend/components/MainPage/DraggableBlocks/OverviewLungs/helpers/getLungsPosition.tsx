export function getLungsPosition() {
  return () => {
    const heart = document?.getElementById("lungs_svg");
    if (!heart) return undefined;

    const rect = heart.getBoundingClientRect();
    return {
      y: rect.top + rect.height / 2,
      x: 0,
    };
  };
}

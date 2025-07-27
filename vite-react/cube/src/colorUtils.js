const referenceColors = {
  red: "#ff0000",
  green: "#27cc27",
  blue: "#267bc5",
  orange: "#ffa500",
  yellow: "#ffff00",
  white: "#ffffff",
};

function classifyColor({ r, g, b }) {
  const input = [r, g, b];
  let closestColor = "white";
  let closestDistance = Infinity;

  for (let [name, hex] of Object.entries(referenceColors)) {
    const target = hexToRgb(hex);
    const dist = Math.sqrt(
      (r - target.r) ** 2 +
      (g - target.g) ** 2 +
      (b - target.b) ** 2
    );
    if (dist < closestDistance) {
      closestDistance = dist;
      closestColor = hex;
    }
  }

  return closestColor;
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

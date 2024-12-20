function parseColor(color = "") {
  if (typeof color !== "string") {
    throw new TypeError("Color should be string!");
  }

  const hexMatch = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(color);
  if (hexMatch) {
    return hexMatch.splice(1).map((c) => Number.parseInt(c, 16));
  }

  const hexMatchShort = /^#?([\da-f])([\da-f])([\da-f])$/i.exec(color);
  if (hexMatchShort) {
    return hexMatchShort.splice(1).map((c) => Number.parseInt(c + c, 16));
  }

  if (color.includes(",")) {
    return color.split(",").map((p) => Number.parseInt(p));
  }

  throw new Error("Invalid color format! Use #ABC or #AABBCC or r,g,b");
}

function hexValue(components) {
  return (
    "#" +
    components.map((c) => `0${c.toString(16).toUpperCase()}`.slice(-2)).join("")
  );
}

function tint(hex, intensity) {
  const color = parseColor(hex);
  return hexValue(color.map((c) => Math.round(c + (255 - c) * intensity)));
}

function shade(hex, intensity) {
  const color = parseColor(hex);
  return hexValue(color.map((c) => Math.round(c * intensity)));
}

const withTint = (intensity) => (hex) => tint(hex, intensity);
const withShade = (intensity) => (hex) => shade(hex, intensity);

const _variants = {
  100: withTint(0.9),
  200: withTint(0.75),
  300: withTint(0.6),
  400: withTint(0.3),
  500: (c) => c,
  600: withShade(0.9),
  700: withShade(0.6),
  800: withShade(0.45),
  900: withShade(0.3),
};

function generator(palette) {
  Object.entries(palette).map(([paletteName, baseColor]) => {
    Object.entries(_variants).map(([palette, v]) => {
      const color = v(baseColor);
      vars.push(`--color-${paletteName}-${palette}: ${color};`);
    });
  });
}

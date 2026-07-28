export const colorMap = {
  Charcoal: "#3B3B3D",
  Camel: "#C19A6B",
  Ivory: "#F5F0E6",
  Plum: "#5B2A45",
  Black: "#161616",
  Brown: "#5C3A21",
  Brass: "#B08D57",
  Sage: "#8A9A80",
  Navy: "#1F2A44",
  Olive: "#5F6B3A",
  Rust: "#9C4A2A",
  Sand: "#D8C6A1",
  Grey: "#8C8C8C",
  Indigo: "#2B3A67",
  Rose: "#C98CA0",
}

export function swatchColor(name) {
  return colorMap[name] || "#B0AAA5"
}

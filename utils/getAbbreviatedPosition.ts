const abbreviated = {
  1: "P",
  2: "C",
  3: "1B",
  4: "2B",
  5: "3B",
  6: "SS",
  7: "LF",
  8: "CF",
  9: "RF",
  10: "C",
} as const;

export function getAbbreviatedPosition(position: number) {
  return abbreviated[position as keyof typeof abbreviated] ?? position;
}

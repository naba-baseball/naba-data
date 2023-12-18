const full = {
  1: "pitcher",
  2: "catcher",
  3: "first base",
  4: "second base",
  5: "third base",
  6: "shortstop",
  7: "left field",
  8: "center field",
  9: "right field",
} as const;

export function getFullPosition(position: number) {
  return full[position as keyof typeof full] ?? position;
}

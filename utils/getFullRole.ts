const full = {
  11: "starting pitcher",
  12: "reserve pitcher",
  13: "closer",
};

export function getFullRole(role: number) {
  return full[role as keyof typeof full] ?? role;
}

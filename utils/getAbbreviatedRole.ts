const abbreviated = {
  11: 'SP',
  12: 'RP',
  13: 'CL',
}
export function getAbbreviatedRole(role: number) {
  return abbreviated[role as keyof typeof abbreviated] ?? role
}

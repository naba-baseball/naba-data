/** takes a number on a 0-250 scale and returns it in an increment of 5 on a 20-80 scale */
export function scaleRatings(value: number) {
  // value is on a number on  scale from 0 to 250
  // we need to translate it to a scale from 20 to 80
  const max = 80
  const min = 20
  // show the given value adjusted to the scale
  const result = ((value - 0) / (250 - 0)) * (80 - 20) + 20

  if (result < min)
    return min
  if (result > max)
    return max
  return Math.ceil(result / 5) * 5
}

export function scaleObject(obj: Record<string, unknown>) {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'number' && key.toLowerCase().includes('rating'))
      obj[key] = scaleRatings(value)
  }
  return obj
}

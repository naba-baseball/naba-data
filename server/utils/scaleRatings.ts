/** takes a number on a 0-250 scale and returns it in an increment of 5 on a 20-80 scale */
export function scaleRatings(value: number) {
  // value is on a number on  scale from 0 to 250
  // we need to translate it to a scale from 20 to 80
  // THIS IS FOR A LINEAR SCALE, WHICH OOTP DOES NOT USE
  // const result = ((value - 1) / (250 - 1)) * (80 - 20) + 20
  // THIS IS WHAT WAS FIGURED OUT ON THE FORUMS https://forums.ootpdevelopments.com/showthread.php?t=150501. Kinda old post
  // const result = (5 * Math.round(value / (50 / 3))) + 20
  // THIS SEEMS TO BE MORE ACCURATE
  const result = 5 * Math.round(Math.ceil(5 * (value / (50 / 3)) + 20) / 5);
  const max = 80;
  const min = 20;
  if (result < min) return min;
  if (result > max) return max;
  return result;
  // return Math.ceil(result / 5) * 5
}

export function scaleObject(obj: Record<string, unknown>) {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "number" && key.toLowerCase().includes("rating"))
      obj[key] = scaleRatings(value);
  }
  return obj;
}

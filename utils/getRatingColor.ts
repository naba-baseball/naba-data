/** @param rating should be a on the 20-80 scale */
export default (rating: number) => {
  if (rating >= 70)
    return 'text-blue-600'
  if (rating >= 55)
    return 'text-green-600'
  if (rating >= 45)
    return 'text-yellow-600'
  if (rating >= 30)
    return 'text-orange-600'
  if (rating >= 20)
    return 'text-red-600'
  return 'text-medium-emphasis'
}

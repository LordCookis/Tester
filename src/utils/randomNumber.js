export const randomNumber = (from, to) => {
  const result = Math.floor(from + (Math.random() * to))
  return result
}
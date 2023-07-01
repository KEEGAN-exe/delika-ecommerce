export const listCategory = async () => {
  const response = await fetch(`http://localhost:3080/category`)
  const json = await response.json()
  return json
}

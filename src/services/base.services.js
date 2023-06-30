export const baseServices = {
  async connect() {
    const result = await fetch("../../api/dbconnect")
    console.log(await result.json())
  }
}
export const testsServices = {
  async add() {
    const result = await fetch("../../api/tests")
    console.log(await result.json())
  }
}
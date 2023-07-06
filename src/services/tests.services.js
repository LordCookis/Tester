export const testsServices = {
  async add() {
    const result = await fetch("../../api/tests", {
      method: 'POST'
    })
    console.log(await result.json())
  },
  async get() {
    const result = await fetch("../../api/tests", {
      method: 'GET'
    })
    console.log(await result.json())
  }
}
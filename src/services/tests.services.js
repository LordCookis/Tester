import tests from "@/models/tests"

export const testsServices = {
  async add(test) {
    await tests.create(test);
  }
}

export default testsServices
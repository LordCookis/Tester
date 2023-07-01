import tests from '@/models/tests'

export default async function testsApi(req, res){
  if (req.method === 'POST') {
    const { test } = req.body
    const result = await tests.create(test)
    res.json({result})
  }
}
import tests from '@/models/tests'

export default async function testApi(req, res){
  if (req.method === 'POST') {
    const { test } = req.body
    console.log("TESTS BACK", test)
    
    const result = await tests.create(test)
    res.json({result})
  }
}
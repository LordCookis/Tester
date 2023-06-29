import tests from '@/models/tests'

export default async function dbConnection(req, res){
  const { test } = req.body
  if (req.method === 'POST') {
    const result = await tests.create({test})
    res.status(200).json({result})
  }
}
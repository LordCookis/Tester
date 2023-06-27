import tests from '@/models/tests'

export default async function dbConnection(req, res){
  const { name, type, owner, questions } = req.body
  const result = await tests.create({
    name,
    type,
    owner,
    questions,
  })
  res.status(200).json({result})
}
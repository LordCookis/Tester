import tests from '@/models/tests'

export default async function dbConnection(req, res){
  res.status(200).json({DBresponse: 'Ыпызява'})
  await tests.create({name: "Ты Питонист?"})
}
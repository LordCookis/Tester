import testsModel from '@/models/testsModel'

export default async function testsApi(req, res){
  console.log(testsModel)
  if (req.method === 'POST') {
    const { test } = req.body
    const result = await testsModel.create(test)
    res.json({result})
  }
  if (req.method === 'GET') {
    const result = await testsModel.find({type: true}).exec()
    res.json({result})
  }
}
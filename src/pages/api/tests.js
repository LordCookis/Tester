import testsModel from '@/models/testsModel'

export default async function testsApi(req, res){
  console.log(testsModel)
  if (req.method === 'POST') {
    const { test } = req.body
    const result = await testsModel.create(test)
    res.json({ result })
  }
  if (req.method === 'GET') {
    //const { type } = req.query
    await testsModel.find({type: true}).toArray()
    res.json({success: true})
  }
}
import testsModel from '@/models/testsModel'

export default async function testsApi(req, res){
  console.log(testsModel)
  if (req.method === 'POST') {
    const { test } = req.body
    const result = await testsModel.create(test)
    res.json({result})
  }
  if (req.method === 'GET') {
    const { owner, type } = req.query
    if (owner) {
      if (type !== null) {
        const result = await testsModel.find({owner: owner, type: type}).exec()
      } else {
        const result = await testsModel.find({owner: owner}).exec()
      }
      res.json({result})
    } else {
      if (type !== undefined) {
        const result = await testsModel.find({type: type}).exec()
        res.json({result})
      } else {
        const result = await testsModel.find().exec()
        res.json({result})
      }
    }
  }
}
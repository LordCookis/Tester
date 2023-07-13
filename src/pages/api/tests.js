import testsModel from '@/models/testsModel'

export default async function testsApi(req, res){
  console.log(testsModel)
  if (req.method === 'POST') {
    const { test } = req.body
    const result = await testsModel.create(test)
    res.json({result})
  }
  if (req.method === 'GET') {
    const { owner, type, text, id } = req.query
    const query = {}
    if (owner) {
      query.owner = owner
    }
    if (type !== undefined) {
      query.type = type
    }
    if (text) {
      const regex = new RegExp(`.*${text}.*`, 'i')
      query.$or = [{name: regex}, {owner: regex}]
    }
    if (id) {
      const result = await testsModel.findById(id)
      res.json(result)
    } else {
      const result = await testsModel.find(query).exec()
      res.json({result})
    }
  }
}
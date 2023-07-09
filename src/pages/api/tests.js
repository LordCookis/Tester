import testsModel from '@/models/testsModel'

export default async function testsApi(req, res){
  console.log(testsModel)
  if (req.method === 'POST') {
    const { test } = req.body
    const result = await testsModel.create(test)
    res.json({result})
  }
  if (req.method === 'GET') {
    const { owner, type, text } = req.query
    const query = {}
    if (owner) {
      query.owner = owner
    }
    if (type !== undefined) {
      query.type = type
    }
    if (text) {
      //const regex = new RegExp(`.*${text}.*`, 'i')
      query.$or = [{name: /.*${text}.*/}, {owner: /.*${text}.*/}]
    }
    const result = await testsModel.find(query).exec()
    res.json({ result })
  }
}
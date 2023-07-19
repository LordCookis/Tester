import resultsModel from '@/models/resultsModel'

export default async function resultApi(req, res){
  if (req.method === 'POST') {
    const { login, trueAnswers, countAnswers, owner, id, name } = req.body
    const result = await resultsModel.create({login: login, trueAnswers: trueAnswers, countAnswers: countAnswers, owner: owner, testId: id, testName: name})
    res.json({result})
  }
  if (req.method === 'GET') {
    const { testId, text } = req.query
    const query = {}
    query.testId = testId
    if (text) {
      const regex = new RegExp(`.*${text}.*`, 'i')
      query.$or = [{login: regex}]
    }
    const result = await resultsModel.find(query).exec()
    res.json({result})
  }
}
import resultsModel from '@/models/resultsModel'

export default async function resultApi(req, res){
  console.log(resultsModel)
  if (req.method === 'POST') {
    const { login, trueAnswers, countAnswers, owner } = req.body
    const result = await resultsModel.create({login: login, trueAnswers: trueAnswers, countAnswers: countAnswers, owner: owner})
    res.json({result})
  }
}
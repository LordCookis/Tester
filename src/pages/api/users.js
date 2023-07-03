import usersModel from '@/models/usersModel'

export default async function usersApi(req, res){
  console.log(usersModel)
  if (req.method === 'POST') {
    const { login, password } = req.body
    const result = await usersModel.create({login: login, password: password, role: false})
    res.json({result})
  }
  if (req.method === 'GET') {
    const { login, password } = req.query
    const result = await usersModel.findOne({login: login})
    if (!result) {
      return res.status(400).json({error: "Ошибка: такого логина нет"})
    }
    if (result.password !== password) {
      return res.status(400).json({error: "Ошибка: пароль неверный"})
    }
    res.json({success: true})
  }
}
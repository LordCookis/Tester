import users from '@/models/users'

export default async function usersApi(req, res){
  if (req.method === 'POST') {
    const { login, password } = req.body
    console.log(login,password)
    const result = await users.create({login: login, password: password, role: false})
    res.json({result})
  }
  if (req.method === 'GET') {
    const { login, password } = req.query
    console.log(login, password)
    const existingUser = await users.findOne({ login: login })
    if (!existingUser) {
      return res.status(400).json({error: "Ошибка: такого логина нет"})
    }
    if (existingUser.password !== password) {
      return res.status(400).json({error: "Ошибка: пароль неверный"})
    }
    localStorage.setItem("login", login)
    res.json({ success: true })
  }
}
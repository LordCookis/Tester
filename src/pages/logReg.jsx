import { useState } from "react"
import { useRouter } from 'next/router'

export default function logReg() {
  const [page, setPage] = useState(true)
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
	const [checkPassword, setCheckPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const log = async(e) => {
    e.preventDefault()
    if (login === "") {
      setError("Ошибка: логина нет")
    } else if (password === "") {
      setError("Ошибка: пароля нет")
    } else {
      const result = await fetch(`/api/users?login=${login}&password=${password}`)
      const data = await result.json()
      if (data.result) {
        localStorage.setItem("login", login)
        console.log("fffff")
        router.push('/')
      }
      setLogin("")
      setPassword("")
      setCheckPassword("")
    }
  }

  const reg = async(e) => {
    e.preventDefault()
    if (login === "") {
      setError("Ошибка: логина нет")
    } else if (password.length < 8) {
      setError("Ошибка: пароль слишком короткий")
    } else if (password !== checkPassword) {
      setError("Ошибка: пароли не совподают")
    } else {
      const result = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({login, password}),
      })
      const data = await result.json()
      if (data.result) {
        localStorage.setItem("login", login)
        console.log("fffff")
        router.push('/')
      }
      setLogin("")
      setPassword("")
      setCheckPassword("")
    }
  }

  const reset = () => {
    setLogin("")
    setPassword("")
    setCheckPassword("")
    setPage(!page)
  }

  return(
    <div className="logRegPage">
      {page ? <form className="logRegDiv" onSubmit={log}>
        <span className="pageSpan">ВХОД</span>
        <input className="input" autoComplete="off" value={login} placeholder="ВВЕДИТЕ ЛОГИН" onChange={(e)=>setLogin(e.target.value)}></input>
        <input className="input" autoComplete="off" value={password} type="password" placeholder="ВВЕДИТЕ ПАРОЛЬ" onChange={(e)=>setPassword(e.target.value)}></input>
        <button className="button">ВОЙТИ</button>
      </form> : <form className="logRegDiv" onSubmit={reg}>
        <span className="pageSpan">РЕГИСТРАЦИЯ</span>
        <input className="input" autoComplete="off" value={login} placeholder="ВВЕДИТЕ ЛОГИН" onChange={(e)=>setLogin(e.target.value)}></input>
        <input className="input" autoComplete="off" value={password} type="password" placeholder="ВВЕДИТЕ ПАРОЛЬ" onChange={(e)=>setPassword(e.target.value)}></input>
        <input className="input" autoComplete="off" value={checkPassword} type="password" placeholder="ПОВТОРИТЕ ПАРОЛЬ" onChange={(e)=>setCheckPassword(e.target.value)}></input>
        <button className="button">ВОЙТИ</button>
      </form>
      }
      <button className="buttonPage" onClick={reset}>{page ? "НЕТ АККАУНТА?" : "ЕСТЬ АККАУНТ?"}</button>
      <span className="errorSpan">{error}</span>
    </div>
  )
}
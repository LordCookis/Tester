import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function NavBar() {
  const [state, setState] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const login = localStorage.getItem('login')
    setState(login)
  }, [])

  const logout = () => {
    localStorage.removeItem('login')
    setState(null)
    router.push('/logReg')
  }
  
  return (
    <div className="NavBar">
      {state ?
        <>
          <Link href="/" className="link">ВСЕ ТЕСТЫ</Link>
          <button className="button" onClick={logout}>ВЫХОД</button>
          <Link href="/myTests" className="link">МОИ ТЕСТЫ</Link>
          <Link href="/addTest" className="link">СОЗДАТЬ ТЕСТ</Link>
        </> 
        : 
        <Link href="/logReg" className="link">ВХОД</Link>
      }
    </div>
  )
}
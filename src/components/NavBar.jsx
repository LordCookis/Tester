import Link from 'next/link'

export default function NavBar() {
  return(
    <div className="NavBar">
      {localStorage.getItem('login') ?
      <>
      <Link href="/" className="link">ВСЕ ТЕСТЫ</Link>
      <button onClick={()=>localStorage.removeItem('login')}>ВЫХОД</button>
      <Link href="/myTests" className="link">МОИ ТЕСТЫ</Link>
      <Link href="/addTest" className="link">СОЗДАТЬ ТЕСТ</Link>
      </> : 
      <>
      <Link href="/logReg" className="link">ВХОД</Link>
      </>
      }
    </div>
  )
}
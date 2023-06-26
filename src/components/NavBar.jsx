import Image from 'next/image'
import Link from 'next/link'
import logReg from '../pages/logReg'
import myTests from '../pages/myTests'
import addTest from '../pages/addTest'

export default function NavBar() {
  return(
    <div className="NavBar">
      <Link href="/" className="link">ВСЕ ТЕСТЫ</Link>
      <Link href="/logReg" className="link">РЕГИСТРАЦИЯ/ВХОД</Link>
      <Image src="https://pbs.twimg.com/profile_images/1985017680/best-wild-life-photos-uk-2011-1_400x400.jpg" height={40} width={40}/>
      <Link href="/myTests" className="link">МОИ ТЕСТЫ</Link>
      <Link href="/addTest" className="link">СОЗДАТЬ ТЕСТ</Link>
    </div>
  )
}